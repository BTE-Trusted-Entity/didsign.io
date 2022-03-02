import {
  ISignatureEndPoint,
  ISignatureEndPointWithStatus,
  SignDoc,
} from './types'
import * as Kilt from '@kiltprotocol/sdk-js'
import { createHash } from './sign-helpers'
import * as zip from '@zip.js/zip.js'
import JSZip from 'jszip'

const fileStatuses = {
  fileStatusArray: [] as boolean[],
  addStatus(status: boolean) {
    this.fileStatusArray.push(status)
    return this
  },
  get fileStatus() {
    return this.fileStatusArray
  },
}

export const getVerifiedData = async (
  jws: string
): Promise<ISignatureEndPoint | undefined> => {
  const header = atob(jws.split('.')[0])
  const payload = atob(jws.split('.')[1])
  const sign = atob(jws.split('.')[2])
  const keyID = JSON.parse(header).keyID
  const hash = JSON.parse(payload).hash
  const urls: string[] = []
  const types: string[] = []

  await Kilt.init({ address: 'wss://spiritnet.kilt.io' })
  const endpoints = Kilt.Did.DidUtils.verifyDidSignature({
    message: hash,
    signature: sign,
    keyId: keyID,
    keyRelationship: Kilt.KeyRelationship.authentication,
  })
    .then(async (response): Promise<ISignatureEndPoint | undefined> => {
      const status = response.verified
      const attesterFullDid = await Kilt.Did.DefaultResolver.resolveDoc(
        keyID.split('#')[0]
      )
      if (attesterFullDid != null && attesterFullDid.details != undefined) {
        const endPoints = attesterFullDid.details.getEndpoints()
        for (const endPoint of endPoints) {
          urls.push(...endPoint.urls)
          types.push(...endPoint.types)
        }
        await Kilt.disconnect()
      }

      if (status) {
        return {
          did: keyID.split('#')[0],
          signature: sign,
          urls: urls,
          types: types,
        } as ISignatureEndPoint
      } else {
        return undefined
      }
    })
    .catch(() => {
      return undefined
    })
  return endpoints
}
export const newUnzip = async (
  file: File
): Promise<ISignatureEndPointWithStatus | undefined> => {
  const reader = new zip.ZipReader(new zip.BlobReader(file))
  const fileData: string[] = []
  let doc: SignDoc = { jws: '', hashes: [] }
  if (fileStatuses.fileStatusArray.length > 0) {
    fileStatuses.fileStatusArray = []
  }
  // get all entries from the zip
  const entries = await reader.getEntries()
  const files = entries.filter((key: zip.Entry) => {
    return !key.filename.match(/^__MACOSX\//)
  })
  if (files.length) {
    for (const entry of files) {
      if (entry.getData != undefined) {
        const text = await entry.getData(new zip.TextWriter())
        if (entry.filename == 'signature.didsign') {
          fileStatuses.addStatus(true)
          doc = JSON.parse(text)
          continue
        }

        const hash = await createHash(text)
        if (JSON.stringify(doc.hashes).includes(hash)) {
          fileStatuses.addStatus(true)
        } else {
          fileStatuses.addStatus(false)
        }
        fileData.push(hash)
      }
    }
    await reader.close()

    const signatureEndpointInstance = await getVerifiedData(doc.jws)
    if (signatureEndpointInstance != undefined) {
      const signEndpointStatus: ISignatureEndPointWithStatus = {
        signatureWithEndpoint: signatureEndpointInstance,
        fileStatus: fileStatuses.fileStatus,
      }

      return signEndpointStatus
    } else {
      return undefined
    }
  }
}

export const getFileNames = async (file: File): Promise<string[]> => {
  const unzip = new JSZip()
  const unzipFile = await unzip.loadAsync(file)
  const filenames = Object.keys(unzipFile.files).filter((key) => {
    return !key.match(/^__MACOSX\//)
  })
  return filenames
}
