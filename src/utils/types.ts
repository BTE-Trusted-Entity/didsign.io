import type { ICredential, DidUrl } from '@kiltprotocol/types';

export interface Signature {
  credentials?: NamedCredential[];
  signature?: string;
  downloaded?: boolean;
  timestamped?: boolean;
}

export interface NamedCredential {
  name: string;
  credential: ICredential;
}

export interface IRemark {
  txHash: string;
  blockHash: string;
}

export interface SignDoc {
  jws: string;
  hashes: string[];
  remark?: IRemark;
  credentials?: NamedCredential[];
}

export interface IKiltAccount {
  address: string;
  source: string;
  name?: string;
}

export type VerificationError = 'Corrupted' | 'Multiple Sign' | 'Invalid';

export type SignWithDid = (plaintext: string) => Promise<{
  signature: string;
  didKeyUri: DidUrl;
  credentials?: { name: string; credential: ICredential }[];
}>;
