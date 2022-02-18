export interface Signature {
  signature: string
  keyID: string
}
export interface SignDoc {
  jws: string
  hashes: string[]
}

export interface ISignatureAndEndPoint {
  signature: string
  did: string
  urls: string[]
  types: string[]
}
export interface Endpoint {
  urls: string[]
  types: string[]
}
