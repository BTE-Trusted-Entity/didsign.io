import {
  ISignatureEndPoint,
  ISignatureEndPointWithStatus,
  SignDoc,
} from './types'
import {
  init,
  Did,
  KeyRelationship,
  disconnect,
  IRequestForAttestation,
  Credential,
  ICredential,
  Attestation,
} from '@kiltprotocol/sdk-js'
import { createHash, createHashFromHashArray } from './sign-helpers'
import * as zip from '@zip.js/zip.js'
import JSZip from 'jszip'

export const getVerifiedData = async (
  jws: string
): Promise<ISignatureEndPoint | undefined> => {
  if (jws === '') {
    return undefined
  }
  const header = atob(jws.split('.')[0])
  const payload = atob(jws.split('.')[1])
  const sign = atob(jws.split('.')[2])
  const keyID = JSON.parse(header).kid
  const hash = JSON.parse(payload).hash
  const urls: string[] = []
  const types: string[] = []
  await init({
    address: process.env.REACT_APP_CHAIN_ENDPOINT || 'wss://spiritnet.kilt.io',
  })
  let w3name = await Did.Web3Names.queryWeb3NameForDid(keyID.split('#')[0])
  if (!w3name) w3name = 'No W3name found'
  const endpoints = Did.DidUtils.verifyDidSignature({
    message: hash,
    signature: { keyId: keyID, signature: sign },
    expectedVerificationMethod: KeyRelationship.authentication,
  })
    .then(async (response): Promise<ISignatureEndPoint | undefined> => {
      const status = response.verified
      const attesterFullDid = await Did.DidResolver.resolveDoc(
        keyID.split('#')[0]
      )
      if (attesterFullDid != null && attesterFullDid.details != undefined) {
        const endPoints = attesterFullDid.details.getEndpoints()
        for (const endPoint of endPoints) {
          urls.push(...endPoint.urls)
          types.push(...endPoint.types)
        }
        await disconnect()
      }

      if (status) {
        return {
          did: keyID.split('#')[0],
          signature: sign,
          urls: urls,
          types: types,
          w3name: w3name,
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
  const fileStatuses: boolean[] = []
  // get all entries from the zip
  const entries = await reader.getEntries()
  const files = entries.filter((key: zip.Entry) => {
    return !key.filename.match(/^__MACOSX\//)
  })
  if (files.length) {
    for (const entry of files) {
      if (entry.getData != undefined) {
        const didSignFile = isDidSignFile(entry.filename)
        if (didSignFile) {
          const text = await entry.getData(new zip.TextWriter())
          fileStatuses.push(true)
          doc = { hashes: JSON.parse(text).hashes, jws: JSON.parse(text).jws }
          continue
        } else {
          const text = await entry.getData(new zip.Uint8ArrayWriter())
          const hash = await createHash(text)
          fileData.push(hash)
        }
      }
    }
    await reader.close()
    fileData.map((hash) => {
      if (doc.hashes.includes(hash)) {
        fileStatuses.push(true)
      } else {
        fileStatuses.push(false)
      }
    })
    const baseHash = await createHashFromHashArray(doc.hashes)

    const jwsBaseHash = atob(doc.jws.split('.')[1])

    if (
      baseHash != JSON.parse(jwsBaseHash).hash ||
      fileStatuses.includes(false)
    ) {
      return undefined
    }

    const signatureEndpointInstance = await getVerifiedData(doc.jws)
    if (signatureEndpointInstance != undefined) {
      const signEndpointStatus: ISignatureEndPointWithStatus = {
        signatureWithEndpoint: signatureEndpointInstance,
        fileStatus: fileStatuses,
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
export const replaceFileStatus = (statusArray: boolean[]): boolean[] => {
  statusArray = statusArray.map((element) => {
    if (element === true) {
      return false
    }
    return element
  })
  return statusArray
}
export const isDidSignFile = (file: string) => {
  return file.split('.').pop() == 'didsign'
}
export const getDidForAccount = (did: string): string => {
  return Did.DidUtils.getKiltDidFromIdentifier(did, 'full')
}

export const getAttestationForRequest = async (
  req4Att: IRequestForAttestation
) => {
  return Attestation.query(req4Att.rootHash)
}

export const validateAttestation = async (attestation: Attestation | null) => {
  if (attestation != null) {
    if (!attestation.revoked) {
      return true
    }
  }
  return false
}
export const validateCredential = async (
  credentialInput: ICredential
): Promise<boolean> => {
  const credential = Credential.fromCredential(credentialInput)
  return await Credential.verify(credential)
}
