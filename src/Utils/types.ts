export interface Signature {
  signature: string
  keyID: string
}
export interface SignDoc {
  jws: string
  hashes: string[]
}

export interface ISignatureEndPoint {
  signature: string
  did: string
  urls: string[]
  types: string[]
}
export interface ISignatureEndPointWithStatus {
  signatureWithEndpoint: ISignatureEndPoint
  fileStatus: boolean[]
}
export interface Endpoint {
  urls: string[]
  types: string[]
}
export interface DidDoc {
  contents: any
  index: number
}
