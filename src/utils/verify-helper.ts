import {
  Attestation,
  Credential,
  Did,
  DidUri,
  ICredential,
  IRequestForAttestation,
  KeyRelationship,
} from '@kiltprotocol/sdk-js';

// disabling until https://github.com/import-js/eslint-plugin-import/issues/2352 is fixed
// eslint-disable-next-line import/no-unresolved
import { base16 } from 'multiformats/bases/base16';

import * as zip from '@zip.js/zip.js';
import JSZip from 'jszip';

import { FileEntry } from '../components/Files/Files';

import { createHash, createHashFromHashArray } from './sign-helpers';
import { IVerifiedSignatureContents, SignDoc } from './types';

export async function getVerifiedData(jws: string) {
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
  return {
    did,
    signature,
  };
}

export async function unzipFileEntries(file: File): Promise<FileEntry[]> {
  const reader = new zip.ZipReader(new zip.BlobReader(file));
  const entries = await reader.getEntries();
  const fileEntries = entries.filter(({ getData }) => getData);
  const result = await Promise.all(
    fileEntries.map(async (entry) => {
      if (!entry.getData) throw new Error('Impossible: no entry.getData');
      const buffer = await entry.getData(new zip.Uint8ArrayWriter());
      const name = entry.filename;
      const file = new File([buffer], name);
      const hash = await createHash(buffer);
      return { file, buffer, name, hash };
    }),
  );
  await reader.close();
  return result;
}

export function isVerified(hash: string, name: string, hashes: string[]) {
  return isDidSignFile({ name }) || hashes.includes(hash);
}

export function hasUnverified(files: FileEntry[], hashes: string[]) {
  return files.some(({ hash, name }) => !isVerified(hash, name, hashes));
}

export async function handleFilesFromZip(
  files: FileEntry[],
): Promise<IVerifiedSignatureContents | undefined> {
  const didSignFile = files.find(isDidSignFile);
  const doc: SignDoc = didSignFile
    ? JSON.parse(await didSignFile.file.text())
    : { jws: '', hashes: [] };

  function addMissingPrefix(hash: string): string {
    return hash.startsWith(base16.prefix) ? hash : `${base16.prefix}${hash}`;
  }

  const { jws, hashes, credentials } = doc;
  const hashesWithPrefix = hashes.map(addMissingPrefix);

  const baseHash = await createHashFromHashArray(hashesWithPrefix);
  const jwsBaseJson = atob(jws.split('.')[1]);
  const jwsBaseHash = addMissingPrefix(JSON.parse(jwsBaseJson).hash);

  if (baseHash !== jwsBaseHash || hasUnverified(files, hashesWithPrefix)) {
    return undefined;
  }

  const verifiedContents = await getVerifiedData(jws);
  if (!verifiedContents) {
    return undefined;
  }

  return {
    ...verifiedContents,
    credentials,
  };
}

export async function getFileNames(file: File): Promise<string[]> {
  const { files } = await new JSZip().loadAsync(file);
  return Object.keys(files).filter((key) => !key.startsWith('__MACOSX/'));
}

export function isDidSignFile({ name }: { name: string }) {
  return name.endsWith('.didsign');
}

export async function getW3NOrDid(did: DidUri): Promise<string> {
  const web3name = await Did.Web3Names.queryWeb3NameForDid(did);
  return web3name ? `w3n:${web3name}` : did;
}

export async function getAttestationForRequest(
  req4Att: IRequestForAttestation,
) {
  return Attestation.query(req4Att.rootHash);
}

export async function validateAttestation(attestation: Attestation | null) {
  return attestation !== null && !attestation.revoked;
}

export async function validateCredential(
  credentialInput: ICredential,
): Promise<boolean> {
  const credential = Credential.fromCredential(credentialInput);
  return Credential.verify(credential);
}
