import { DidUri, RequestForAttestation } from '@kiltprotocol/sdk-js';

export interface Signature {
  credentials?: NamedCredential[];
  signature?: string;
  downloaded?: boolean;
  timestamped?: boolean;
}

export interface NamedCredential {
  name: string;
  credential: RequestForAttestation;
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
