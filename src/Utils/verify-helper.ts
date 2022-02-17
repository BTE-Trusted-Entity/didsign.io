import { Signature, SignDoc } from './types'
import * as Kilt from '@kiltprotocol/sdk-js'
import { createHash } from './sign-helpers'
import * as zip from '@zip.js/zip.js'

export const app = async (jws: string): Promise<Signature | undefined> => {
  const header = atob(jws.split('.')[0])
  const payload = atob(jws.split('.')[1])
  const sign = atob(jws.split('.')[2])
  const keyID = JSON.parse(header).keyID
  const hash = JSON.parse(payload).hash

  await Kilt.init({ address: 'wss://spiritnet.kilt.io' })
  const signature = await Kilt.Did.DidUtils.verifyDidSignature({
    message: hash,
    signature: sign,
    keyId: keyID,
    keyRelationship: Kilt.KeyRelationship.authentication,
  })
  const status = signature.verified
  console.log(status)
  if (status) {
    return { keyID: keyID, signature: sign } as Signature
  }
}
export const newUnzip = async (file: File): Promise<Signature | undefined> => {
  const reader = new zip.ZipReader(new zip.BlobReader(file))
  const fileData: string[] = []
  let doc: SignDoc = { jws: '', hashes: [] }

  // get all entries from the zip
  const entries = await reader.getEntries()
  if (entries.length) {
    for (const entry of entries) {
      if (entry.getData != undefined) {
        const text = await entry.getData(new zip.TextWriter())
        if (entry.filename == 'DIDsign.signature') {
          doc = JSON.parse(text)
          continue
        }
        const hash = await createHash(text)
        fileData.push(hash)
      }
    }
    await reader.close()

    if (JSON.stringify(fileData.sort()) == JSON.stringify(doc.hashes.sort())) {
      return await app(doc.jws)
    } else {
      return undefined
    }
  }
}
