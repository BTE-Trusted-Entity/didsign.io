import {
  Attestation,
  Credential,
  Did,
  DidUri,
  ICredential,
  IRequestForAttestation,
  KeyRelationship,
} from '@kiltprotocol/sdk-js';

import { base16 } from 'multiformats/bases/base16';
import * as zip from '@zip.js/zip.js';
import JSZip from 'jszip';

import { createHash, createHashFromHashArray } from './sign-helpers';
import { IRemark, IVerifiedSignatureContents, SignDoc } from './types';
import { getVerifiedTimestamp } from './timestamp';

const resolveServiceEndpoints = async (did: DidUri) => {
  const didDetails = await Did.DidResolver.resolveDoc(did);
  const endPoints = didDetails?.details?.getEndpoints();
  if (endPoints) {
    return endPoints;
  } else {
    return [];
  }
};

export const getVerifiedData = async (jws: string, remark?: IRemark) => {
  if (jws === '') {
    return null;
  }
  const [header64, payload64, signature64] = jws.split('.');
  const header = atob(header64);
  const payload = atob(payload64);
  const signature = atob(signature64);
  const keyUri = JSON.parse(header).kid;
  const hash = JSON.parse(payload).hash;
  const { verified } = await Did.verifyDidSignature({
    message: hash,
    signature: { keyUri, signature },
    expectedVerificationMethod: KeyRelationship.authentication,
  });
  if (!verified) {
    return null;
  }

  const { did } = Did.Utils.parseDidUri(keyUri);
  const endpoints = await resolveServiceEndpoints(did);
  const w3name = await Did.Web3Names.queryWeb3NameForDid(did);
  const timestampWithTxHash = await getVerifiedTimestamp(signature, remark);
  const { txHash, timestamp } = timestampWithTxHash || {};
  return {
    did,
    signature,
    endpoints,
    w3name,
    timestamp,
    txHash,
  };
};

export const newUnzip = async (
  file: File,
): Promise<IVerifiedSignatureContents | undefined> => {
  const reader = new zip.ZipReader(new zip.BlobReader(file));
  const fileData: string[] = [];
  let doc: SignDoc = {
    jws: '',
    hashes: [],
  };
  const filesStatus: boolean[] = [];
  // get all entries from the zip
  const entries = await reader.getEntries();
  const files = entries.filter((key: zip.Entry) => {
    return !key.filename.match(/^__MACOSX\//);
  });
  if (files.length) {
    for (const entry of files) {
      if (entry.getData) {
        if (isDidSignFile(entry.filename)) {
          const text = await entry.getData(new zip.TextWriter());
          filesStatus.push(true);
          doc = JSON.parse(text);
          continue;
        } else {
          const text = await entry.getData(new zip.Uint8ArrayWriter());
          const hash = await createHash(text);
          fileData.push(hash);
        }
      }
    }
    await reader.close();

    const addMissingPrefix = (hash: string): string =>
      hash.startsWith(base16.prefix) ? hash : `${base16.prefix}${hash}`;
    const { jws, hashes, remark, credentials } = doc;
    const hashesWithPrefix = hashes.map((hash) => addMissingPrefix(hash));

    fileData.map((hash) => {
      if (hashesWithPrefix.includes(hash)) {
        filesStatus.push(true);
      } else {
        filesStatus.push(false);
      }
    });

    const baseHash = await createHashFromHashArray(hashesWithPrefix);
    const jwsBaseJson = atob(jws.split('.')[1]);
    const jwsBaseHash = addMissingPrefix(JSON.parse(jwsBaseJson).hash);

    if (baseHash !== jwsBaseHash || filesStatus.includes(false)) {
      return undefined;
    }

    const verifiedContents = await getVerifiedData(jws, remark);

    if (verifiedContents) {
      const signEndpointStatus: IVerifiedSignatureContents = {
        ...verifiedContents,
        credentials,
        filesStatus,
      };
      return signEndpointStatus;
    } else {
      return undefined;
    }
  }
};

export const getFileNames = async (file: File): Promise<string[]> => {
  const unzip = new JSZip();
  const unzipFile = await unzip.loadAsync(file);
  const filenames = Object.keys(unzipFile.files).filter((key) => {
    return !key.match(/^__MACOSX\//);
  });
  return filenames;
};

export const replaceFileStatus = (statusArray: boolean[]): boolean[] => {
  statusArray = statusArray.map((element) => {
    if (element === true) {
      return false;
    }
    return element;
  });
  return statusArray;
};
export const isDidSignFile = (file: string) => {
  return file.split('.').pop() == 'didsign';
};

export async function getW3NOrDid(did: DidUri): Promise<string> {
  const web3name = await Did.Web3Names.queryWeb3NameForDid(did);
  return web3name ? `w3n:${web3name}` : did;
}

export const getAttestationForRequest = async (
  req4Att: IRequestForAttestation,
) => {
  return Attestation.query(req4Att.rootHash);
};

export const validateAttestation = async (attestation: Attestation | null) => {
  if (attestation != null) {
    if (!attestation.revoked) {
      return true;
    }
  }
  return false;
};

export const validateCredential = async (
  credentialInput: ICredential,
): Promise<boolean> => {
  const credential = Credential.fromCredential(credentialInput);
  return await Credential.verify(credential);
};
