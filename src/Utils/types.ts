import {
  DidServiceEndpoint,
  DidUri,
  IClaimContents,
  RequestForAttestation,
} from '@kiltprotocol/sdk-js';
export interface Signature {
  credentials?: CredentialInteface[];
  signature: string;
}

export interface CredentialInteface {
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
  credentials?: CredentialInteface[];
}

export interface IVerifiedSignatureContents {
  signature: string;
  did: DidUri | undefined;
  endpoints: DidServiceEndpoint[];
  w3name: string | null;
  timestamp?: string;
  txHash?: string;
  credentials?: CredentialInteface[];
  filesStatus: boolean[];
}

export interface ICredentialContents {
  claimContents: IClaimContents;
  status: 'valid' | 'mismatch did' | 'invalid' | 'not attested' | 'not kilt';
}

export interface IKiltAccount {
  address: string;
  source: string;
  name?: string;
}
