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
import { SignDoc } from './types';

export function addMissingPrefix(hash: string): string {
  return hash.startsWith(base16.prefix) ? hash : `${base16.prefix}${hash}`;
}

export function parseJWS(jws: string) {
  const [headerJSON, payloadJSON, signature] = jws.split('.').map(atob);

  const header = JSON.parse(headerJSON);
  const payload = JSON.parse(payloadJSON);

  return {
    header,
    payload: {
      ...payload,
      hash: addMissingPrefix(payload.hash),
    },
    signature,
  };
}

export async function getSignDoc(file: File): Promise<SignDoc> {
  const data = JSON.parse(await file.text()) as SignDoc;

  const { jws, hashes, remark, credentials } = data;
  if (!jws || !hashes) {
    throw new Error('Invalid content');
  }
  const parsedJWS = parseJWS(jws);

  const hashesWithPrefix = hashes.map(addMissingPrefix);
  const baseHash = await createHashFromHashArray(hashesWithPrefix);
  const baseHashesMatch = baseHash === parsedJWS.payload.hash;
  if (!baseHashesMatch) {
    throw new Error('Hashes do not match');
  }

  const {
    header: { kid: keyUri },
    payload: { hash: message },
    signature,
  } = parsedJWS;

  const { verified } = await Did.verifyDidSignature({
    message,
    signature: { keyUri, signature },
    expectedVerificationMethod: KeyRelationship.authentication,
  });
  if (!verified) {
    throw new Error('Signature is invalid');
  }

  return {
    jws,
    hashes: hashesWithPrefix,
    remark,
    credentials,
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

export async function zipContainsDidSignFile(file: File) {
  if (!file.name.endsWith('.zip')) {
    return false;
  }
  const fileNames = await getFileNames(file);
  return fileNames.some((name) => isDidSignFile({ name }));
}
