import {
  DidResourceUri,
  DidServiceEndpoint,
  DidUri,
} from '@kiltprotocol/sdk-js';
export interface Signature {
  signature: string;
  keyUri: DidResourceUri;
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
  didUri: DidUri | undefined;
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
