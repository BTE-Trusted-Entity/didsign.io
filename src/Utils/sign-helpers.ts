import * as hasher from 'multiformats/hashes/hasher'
import { sha256 } from 'js-sha256'
import { base16 } from 'multiformats/bases/base16'
import * as json from 'multiformats/codecs/json'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Signature } from './types'
import { IBuffer } from '../Features/Signer/FileSlice'

export const sha56 = hasher.from({
  name: 'sha2-256',
  code: 0x12,
  encode: (input) => new Uint8Array(sha256.arrayBuffer(input)),
})

export const createHash = async (blob: ArrayBuffer | null): Promise<string> => {
  if (!blob) throw new Error('No File given')
  const blobAsU8a = new Uint8Array(blob)
  const hash = await sha56.digest(blobAsU8a)
  return base16.baseEncode(hash.bytes)
}

const sporranWindow = window.kilt || {}
export const createHashFromHashArray = async (
  hashArray: string[]
): Promise<string> => {
  if (hashArray.length === 1) {
    return hashArray[0]
  }
  const sortedHash = [...hashArray].sort()
  const asJson = json.encode(sortedHash)
  return await createHash(asJson)
}

export const generateZipFile = async (buffers: IBuffer[]) => {
  const zip = new JSZip()
  buffers.map((buffer) => zip.file(buffer.name, buffer.buffer))
  const content = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'STORE',
      streamFiles: true,
      compressionOptions: {
        level: 1,
      },
    },
    function updateCallback(metadata) {
      console.log('progression: ' + metadata.percent.toFixed(0) + ' %')
      if (metadata.currentFile) {
        console.log('current file = ' + metadata.currentFile)
      }
    }
  )
  saveAs(content, 'DIDsign-files.zip')
}

export const openSporan = async (finalHash: string): Promise<Signature> => {
  const signObj = await sporranWindow.sporran.signWithDid(finalHash)
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
    alg: 'Sr25519',
    typ: 'JWS',
    kid: signature.keyID,
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
