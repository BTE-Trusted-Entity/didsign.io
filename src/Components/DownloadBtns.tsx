import React from 'react'
import { selectFinalHash, selectHash } from "../Features/Signer/hashSlice"
import { useAppSelector } from "../app/hooks"
import { selectDid, selectSign } from "../Features/Signer/SignatureSlice"
import { SignHelper } from '../Utils/sign-helpers'
import { Signature, SignDoc } from '../Utils/types'
import { saveAs } from "file-saver"
import { selectFile, addFileTop } from '../Features/Signer/FileSlice'


function DownloadBtns() {
    const sign = useAppSelector(selectSign)
    const did = useAppSelector(selectDid)
    const finalHash = useAppSelector(selectFinalHash)
    const hashes = useAppSelector(selectHash)
    const files = useAppSelector(selectFile)
    const signature: Signature = { did: did, signature: sign }
    let jws = ""



    const handleDownloadSign = async () => {
        jws = SignHelper.generateJWS(signature, await finalHash)
        const blob = new Blob([JSON.stringify(jws)], { type: "text/plain;charset=utf-8" })
        saveAs(blob, "myDIDsign.signature")
    }
    const handleZip = async () => {
        jws = SignHelper.generateJWS(signature, await finalHash)
        const signedDoc: SignDoc = { hashes: hashes, jws: jws }
        SignHelper.generateZipFile(files, signedDoc)
    }
    return <div>
        <div className="bg-[#ddf0ff80] border-solid border-[#517ca240] border-2 mx-auto flex flex-col space-y-2 items-center justify-center pt-8 pb-8 w-[48%]">
            <div className="w-[23%] h-14 2xl:w-[18%] 2xl:h-20">
                <button className=" w-full h-2/3 font-[Overpass Regular] bg-sky-700 text-zinc-50 rounded-md" onClick={handleZip}>Download Zip</button>
            </div>
            <label className="w-fit font-[Overpass Regular] text-sky-70">OR</label>
            <div className="w-[26%] 2xl:w-[20%] h-14 2xl:h-20">
                <button className="w-full h-2/4 font-[Overpass Regular] bg-sky-700 text-zinc-50 rounded-md" onClick={handleDownloadSign}>Download Signature</button></div>
        </div>
    </div>
}

export default DownloadBtns
