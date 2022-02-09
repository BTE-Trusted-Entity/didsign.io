import * as hasher from "multiformats/hashes/hasher"
import { sha256 } from "js-sha256"
import { base16 } from "multiformats/bases/base16"
import * as json from "multiformats/codecs/json"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { Signature, SignDoc } from "./types"


declare global {
    // eslint-disable-next-line
    interface Window { kilt: any; }
}
window.kilt = window.kilt || {}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SignHelper {
    export const createHashFromHashArray = async (hashArray: string[]): Promise<string> => {
        if (hashArray.length === 1) {

            return hashArray[0]
        }
        const sortedHash = [...hashArray].sort()
        return await createHash(sortedHash)

    }

    export const sha56 = hasher.from({
        name: "sha2-256",
        code: 0x12,
        encode: (input) =>
            new Uint8Array(sha256.arrayBuffer(input))
    })

    export const createHash = async (blob: string | string[] | ArrayBuffer | null): Promise<string> => {
        const hash = await sha56.digest(json.encode(blob))
        return (base16.baseEncode(hash.bytes))
    }
    export const generateZipFile = (files: File[], didSign: SignDoc) => {
        const zip = new JSZip()
        files.map(file => zip.file(file.name, file))
        zip.file("myDIDSign.signature", JSON.stringify(didSign))
        zip.generateAsync({ type: "blob" })
            .then(function (content: Blob) {
                saveAs(content, "signed-files.zip")

            })
    }

    export const openSporan = async (finalHash: string): Promise<Signature> => {
        const signObj = await window.kilt.sporran.signWithDid(finalHash)
        const sign: Signature = { did: signObj.did, signature: signObj.signature }
        return sign
    }

    export const generateJWS = (signature: Signature, finalHash: string): string => {
        const header = {
            "alg": "ED25519",
            "typ": "JWS",
            "keyID": signature.did
        }
        const encodedHeaders = btoa(JSON.stringify(header)).replaceAll("=","")
        const claim = {
            "hash": finalHash,
        }
        const encodedPlayload = btoa(JSON.stringify(claim)).replaceAll("=","")
        const encodedSignature = btoa(signature.signature).replaceAll("=","")
        const jws = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`
        return jws
    }

}