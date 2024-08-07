import type { Did, DidUrl, ICredential } from '@kiltprotocol/types';
import type { KiltVerifiablePresentationV1 } from '../components/Credential/Credential';

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
  verifiablePresentation?: KiltVerifiablePresentationV1;
}

export interface IKiltAccount {
  address: string;
  source: string;
  name?: string;
}

export type VerificationError = 'Corrupted' | 'Multiple Sign' | 'Invalid';

export type SignWithDid = (
  plaintext: string,
  did?: Did,
) => Promise<{
  signature: string;
  didKeyUri: DidUrl;
  credentials?: { name: string; credential: ICredential }[];
}>;
