import * as Did from '@kiltprotocol/did';
import { Crypto } from '@kiltprotocol/utils';

// disabling until https://github.com/import-js/eslint-plugin-import/issues/2352 is fixed
// eslint-disable-next-line import/no-unresolved
import { base16 } from 'multiformats/bases/base16';

import * as zip from '@zip.js/zip.js';
import JSZip from 'jszip';

import { FileEntry } from '../components/Files/Files';

import { apiPromise } from './api';
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

  const { jws, hashes, remark, credentials, verifiablePresentation } = data;
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
    header: { kid: signerUrl },
    payload: { hash: message },
    signature,
  } = parsedJWS;

  await apiPromise;
  await Did.verifyDidSignature({
    message,
    signerUrl,
    signature: Crypto.coToUInt8(signature),
    expectedVerificationRelationship: 'authentication',
  });

  return {
    jws,
    hashes: hashesWithPrefix,
    remark,
    credentials,
    verifiablePresentation,
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

export async function zipContainsDidSignFile(file: File) {
  if (!file.name.endsWith('.zip')) {
    return false;
  }
  const fileNames = await getFileNames(file);
  return fileNames.some((name) => isDidSignFile({ name }));
}
