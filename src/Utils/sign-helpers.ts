import { sha256AsU8a } from '@polkadot/util-crypto';
import * as hasher from 'multiformats/hashes/hasher';
import { base16 } from 'multiformats/bases/base16';
import * as json from 'multiformats/codecs/json';

export const sha56 = hasher.from({
  name: 'sha2-256',
  code: 0x12,
  encode: sha256AsU8a,
});

export const createHash = async (blob: ArrayBuffer | null): Promise<string> => {
  if (!blob) throw new Error('No File given');
  const blobAsU8a = new Uint8Array(blob);
  const hash = await sha56.digest(blobAsU8a);
  return base16.encode(hash.bytes);
};

const sporranWindow = window.kilt || {};
export const createHashFromHashArray = async (
  hashArray: string[],
): Promise<string> => {
  if (hashArray.length === 1) {
    return hashArray[0];
  }
  const sortedHash = [...hashArray].sort();
  const asJson = json.encode(sortedHash);
  return await createHash(asJson);
};

export const getSignatureContents = async (finalHash: string) =>
  sporranWindow.sporran.signWithDid(finalHash);

export const generateJWS = (
  signature: { signature: string; didKeyUri: string },
  finalHash: string,
): string => {
  const header = {
    alg: 'Sr25519',
    typ: 'JWS',
    kid: signature.didKeyUri,
  };
  const encodedHeaders = btoa(JSON.stringify(header)).replaceAll('=', '');
  const claim = {
    hash: finalHash,
  };
  const encodedPlayload = btoa(JSON.stringify(claim)).replaceAll('=', '');
  const encodedSignature = btoa(signature.signature).replaceAll('=', '');
  const jws = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`;
  return jws;
};

export async function createDidSignFile(blob: Blob) {
  const name = 'signature.didsign';
  const file = new File([blob], name);
  const buffer = await file.arrayBuffer();
  return { file, buffer, name, hash: '' };
}
