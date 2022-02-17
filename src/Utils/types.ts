export interface Signature {
  signature: string
  keyID: string
}
export interface SignDoc {
  jws: string
  hashes: string[]
}
