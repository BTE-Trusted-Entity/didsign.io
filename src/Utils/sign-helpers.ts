import * as hasher from 'multiformats/hashes/hasher'
import { sha256 } from 'js-sha256'
import { base16 } from 'multiformats/bases/base16'
import * as json from 'multiformats/codecs/json'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Signature } from './types'

window.kilt = window.kilt || {}
export const createHashFromHashArray = async (
  hashArray: string[]
): Promise<string> => {
  if (hashArray.length === 1) {
    return hashArray[0]
  }
  const sortedHash = [...hashArray].sort()
  return await createHash(sortedHash)
}

export const sha56 = hasher.from({
  name: 'sha2-256',
  code: 0x12,
  encode: (input) => new Uint8Array(sha256.arrayBuffer(input)),
})

export const createHash = async (
  blob: string | string[] | ArrayBuffer | null
): Promise<string> => {
  const hash = await sha56.digest(json.encode(blob))
  return base16.baseEncode(hash.bytes)
}
export const generateZipFile = async (files: File[]) => {
  const zip = new JSZip()
  files.map((file) => zip.file(file.name, file))
  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'DIDsign-files.zip')
}

export const openSporan = async (finalHash: string): Promise<Signature> => {
  const signObj = await window.kilt.sporran.signWithDid(finalHash)
  const sign: Signature = {
    keyID: signObj.didKeyUri,
    signature: signObj.signature,
  }
  return sign
}

export const generateJWS = (
  signature: Signature,
  finalHash: string
): string => {
  const header = {
    alg: 'ED25519',
    typ: 'JWS',
    keyID: signature.keyID,
  }
  const encodedHeaders = btoa(JSON.stringify(header)).replaceAll('=', '')
  const claim = {
    hash: finalHash,
  }
  const encodedPlayload = btoa(JSON.stringify(claim)).replaceAll('=', '')
  const encodedSignature = btoa(signature.signature).replaceAll('=', '')
  const jws = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`
  return jws
}
