import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { updateSign, updateDID } from '../Features/Signer/SignatureSlice'
import { openSporan, generateJWS } from '../Utils/sign-helpers'
import { selectFinalHash, selectHash } from '../Features/Signer/hashSlice'
import { addFileTop } from '../Features/Signer/FileSlice'
import { Signature, SignDoc } from '../Utils/types'

export function SignBtn() {
  function ButtonDisabled() {
    return (
      <button
        className="font-[Overpass Regular] text-[14px] tracking-wide text-[#ffffff80] text-center w-32 h-8 mt-4 mb-4 rounded-md 
                my-auto bg-[#718BA3] 2xl:h-[40px] 2xl:w-[180px] shadow-md"
        onClick={handleChange}
      >
        SIGN
      </button>
    )
  }
  function ButtonEnabled() {
    return (
      <button
        className="font-[Overpass Regular] text-[14px] tracking-wide text-white text-center w-32 h-8 mt-4 mb-4 rounded-md 
    my-auto bg-sky-700 2xl:h-[40px] 2xl:w-[180px] shadow-md"
        onClick={handleChange}
      >
        SIGN
      </button>
    )
  }
  const hashes = useAppSelector(selectHash)
  const finalHash = useAppSelector(selectFinalHash)

  const dispatch = useAppDispatch()
  const handleChange = async () => {
    if (hashes.length == 0) {
      return
    }
    console.log(hashes)
    document.body.classList.add('blur-sm')
    openSporan(await finalHash)
      .then(async (response) => {
        dispatch(updateSign(response.signature))
        dispatch(updateDID(response.keyID))
        const signature: Signature = {
          keyID: response.keyID,
          signature: response.signature,
        }
        const jws = generateJWS(signature, await finalHash)
        const signedDoc: SignDoc = { hashes: hashes, jws: jws }
        const blob = new Blob([JSON.stringify(signedDoc)], {
          type: 'text/plain;charset=utf-8',
        })
        const newFile = new File([blob], 'DIDsign.signature')
        dispatch(addFileTop(newFile))

        document.body.classList.remove('blur-sm')
      })
      .catch(() => {
        console.log(`Sign Error`)
        document.body.classList.remove('blur-sm')
      })
  }
  return (
    <div className="bg-[#ddf0ff80] border-solid border-[#517ca240] border-2 rounded-b-lg mt-0  mx-auto w-[48%] flex items-center justify-center mb-8">
      {hashes.length == 0 ? <ButtonDisabled /> : <ButtonEnabled />}
    </div>
  )
}
