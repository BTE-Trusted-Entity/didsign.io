import React from 'react'
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { updateSign, updateDID, selectSign } from "../Features/Signer/SignatureSlice"
import { SignHelper } from '../Utils/sign-helpers'
import { selectFinalHash, selectHash } from "../Features/Signer/hashSlice"
import { selectFile, addFileTop } from '../Features/Signer/FileSlice'
import { Signature, SignDoc } from '../Utils/types'




function SignBtn() {
    const hashes = useAppSelector(selectHash)
    const finalHash = useAppSelector(selectFinalHash)

    const dispatch = useAppDispatch()
    const handleChange = async () => {
        if (hashes.length == 0) { return }
        document.body.classList.add("blur-sm")
        SignHelper.openSporan(await finalHash).then(async response => {
            dispatch(updateSign(response.signature))
            dispatch(updateDID(response.did))
            const signature: Signature = { did: response.did, signature: response.signature }
            const jws = SignHelper.generateJWS(signature, await finalHash)
            const signedDoc: SignDoc = { hashes: hashes, jws: jws }
            const blob = new Blob([JSON.stringify(signedDoc)], { type: "text/plain;charset=utf-8" })
            const newFile = new File([blob], "mydidsign.signature")
            dispatch(addFileTop(newFile))

            document.body.classList.remove("blur-sm")

        }).catch(() => {
            console.log(`Sign Error`)
            document.body.classList.remove("blur-sm")


        })
    }
    return <div className="bg-[#ddf0ff80] border-solid border-[#517ca240] border-2  mx-auto w-[48%] flex items-center justify-center h-1/2">
        <button className="font-[Overpass Regular] bg-sky-700 text-zinc-50 text-center w-44 2xl:w-56 2xl:h-12 mt-4 mb-4 rounded-md h-10 my-auto" onClick={handleChange}>Sign</button>
    </div>
}

export default SignBtn



