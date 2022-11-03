import type { SignDoc } from './types';

import { sha256AsU8a } from '@polkadot/util-crypto';

/* eslint-disable import/no-unresolved */
// disabling until https://github.com/import-js/eslint-plugin-import/issues/2352 is fixed
import * as hasher from 'multiformats/hashes/hasher';
import { base16 } from 'multiformats/bases/base16';
import * as json from 'multiformats/codecs/json';
/* eslint-enable import/no-unresolved */

export const sha56 = hasher.from({
  name: 'sha2-256',
  code: 0x12,
  encode: sha256AsU8a,
});

export async function createHash(blob: ArrayBuffer | null): Promise<string> {
  if (!blob) throw new Error('No File given');
  const blobAsU8a = new Uint8Array(blob);
  const hash = await sha56.digest(blobAsU8a);
  return base16.encode(hash.bytes);
}

const sporranWindow = window.kilt || {};

export async function createHashFromHashArray(
  hashArray: string[],
): Promise<string> {
  if (hashArray.length === 1) {
    return hashArray[0];
  }
  const sortedHash = [...hashArray].sort();
  const asJson = json.encode(sortedHash);
  return createHash(asJson);
}

export async function getSignatureContents(finalHash: string) {
  return sporranWindow.sporran.signWithDid(finalHash);
}

function encode(input: string) {
  return btoa(input).replaceAll('=', '');
}

export function generateJWS(
  { didKeyUri, signature }: { signature: string; didKeyUri: string },
  hash: string,
): string {
  const headers = JSON.stringify({
    alg: 'Sr25519',
    typ: 'JWS',
    kid: didKeyUri,
  });
  const payload = JSON.stringify({
    hash,
  });
  return `${encode(headers)}.${encode(payload)}.${encode(signature)}`;
}

export async function createDidSignFile(data: SignDoc) {
  const blob = new Blob([JSON.stringify(data)], {
    type: 'application/json;charset=utf-8',
  });
  const name = 'signature.didsign';
  const file = new File([blob], name);
  const buffer = await file.arrayBuffer();
  const hash = await createHash(buffer);
  return { file, buffer, name, hash };
}
