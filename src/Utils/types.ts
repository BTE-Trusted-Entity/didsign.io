import { DidServiceEndpoint } from '@kiltprotocol/sdk-js';
export interface Signature {
  signature: string;
  keyID: string;
}

export interface IRemark {
  txHash: string;
  blockHash: string;
}
export interface SignDoc {
  jws: string;
  hashes: string[];
  remark?: IRemark;
}

export interface ISignatureEndPoint {
  signature: string;
  did: string;
  endpoints: DidServiceEndpoint[];
  w3name: string | null;
  timestamp?: string;
  txHash?: string;
}

export interface ISignatureEndPointWithStatus {
  signatureWithEndpoint: ISignatureEndPoint;
  fileStatus: boolean[];
}

export interface IKiltAccount {
  address: string;
  source: string;
  name?: string;
}
