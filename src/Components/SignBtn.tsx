import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { updateSign, updateDID } from '../Features/Signer/SignatureSlice'
import { openSporan, generateJWS } from '../Utils/sign-helpers'
import { selectFinalHash, selectHash } from '../Features/Signer/hashSlice'
import { addFileTop } from '../Features/Signer/FileSlice'
import { Signature, SignDoc } from '../Utils/types'
import InfoIcon from '../ImageAssets/iconBIG_info.svg'
import AttentionIcon from '../ImageAssets/iconBIG_attention.svg'
import CenterLeftBubble from '../ImageAssets/CenterLeftBubble.svg'
import info from '../ImageAssets/icon_info.svg'

export const SignBtn = () => {
  const [signStatus, setSignStatus] = useState<boolean | 'Default'>('Default')
  const [popupIcon, setPopupIcon] = useState<string>(InfoIcon)
  const ButtonDisabled = () => {
    return (
      <button
        className="font-['Overpass'] text-[14px] leading-[16px]  tracking-[0.1px] text-[#ffffff80] text-center w-[160px] h-[30px] mt-4 mb-4 rounded-md 
                my-auto bg-[#718BA3] shadow-md"
        onClick={handleChange}
      >
        SIGN
      </button>
    )
  }
  const ButtonEnabled = () => {
    return (
      <button
        className="font-['Overpass'] text-[14px] leading-[16px]  tracking-[0.1px] text-white text-center w-[160px] h-[30px] mt-4 mb-4 rounded-md 
    my-auto bg-[#3E6E99] shadow-md"
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

    ;(
      document.getElementById('sporran-popup') as HTMLDivElement
    ).classList.remove('invisible')
    ;(
      document.getElementById('sign-component') as HTMLDivElement
    ).classList.add('blur-sm')
    ;(
      document.getElementById('sign-component') as HTMLDivElement
    ).style.pointerEvents = 'none'
    document.body.style.overflowY = 'hidden'
    openSporan(await finalHash)
      .then(async (response) => {
        dispatch(updateSign(response.signature))
        dispatch(updateDID(response.keyID))
        const signature: Signature = {
          keyID: response.keyID,
          signature: response.signature,
        }
        document.body.style.overflowY = 'scroll'

        const jws = generateJWS(signature, await finalHash)
        const signedDoc: SignDoc = { hashes: hashes, jws: jws }
        const blob = new Blob([JSON.stringify(signedDoc)], {
          type: 'text/plain;charset=utf-8',
        })
        const newFile = new File([blob], 'signature.didsign')
        dispatch(addFileTop(newFile))
        ;(
          document.getElementById('sign-component') as HTMLDivElement
        ).classList.remove('blur-sm')
      })

      .catch(() => {
        setPopupIcon(AttentionIcon)
        setSignStatus(false)
      })
  }
  const handleDismiss = () => {
    document.body.style.overflowY = 'scroll'
    ;(
      document.getElementById('sign-component') as HTMLDivElement
    ).style.pointerEvents = 'visible'
    setPopupIcon(InfoIcon)
    setSignStatus('Default')
    ;(document.getElementById('sporran-popup') as HTMLDivElement).classList.add(
      'invisible'
    )
    ;(
      document.getElementById('sign-component') as HTMLDivElement
    ).classList.remove('blur-sm')
    ;(
      document.getElementById('sign-btn') as HTMLButtonElement
    ).classList.remove('blur-sm')
  }
  return (
    <div>
      <div
        id="sporran-popup"
        className="invisible fixed w-[24%] h-[fit] bg-mid-body shadow-2xl rounded-md left-1/2 top-1/4 mt-[3%] -ml-[12%]"
      >
        <div className="flex relative flex-col w-full h-full items-center mt-4 space-y-5 pl-4 pr-4 pb-4 ">
          <img
            src={CenterLeftBubble}
            className="absolute bottom-0 left-0 mt-auto pointer-events-none"
          />
          <div>
            <img src={popupIcon} />
          </div>
          {signStatus === 'Default' ? (
            <span className="font-['Overpass'] tracking-wide text-lg text-[#2A2231]">
              Signature needed
            </span>
          ) : (
            <span className="font-['Overpass'] tracking-wide text-lg text-[#2A2231]">
              Sign Error
            </span>
          )}
          {signStatus === 'Default' ? (
            <span className="font-['Overpass'] -tracking-tigher text-[#2A2231] text-[16px] pl-4 pr-4 text-justify">
              Please wait for your wallet extension to open and sign the
              transaction there.
            </span>
          ) : (
            <span className="font-['Overpass'] -tracking-tigher text-[#2A2231] text-[16px] pl-4 pr-4 text-justify">
              It looks like error occured while signing. Please try again.
            </span>
          )}
          <button
            onClick={handleDismiss}
            className="font-['Overpass'] rounded-md w-1/3 text-[12px] leading-[12px]  tracking-[0.1px] pl-4 pr-4 text-center h-[25px] bg-[#3E6E99] text-white"
          >
            DISMISS
          </button>
        </div>
      </div>

      <div
        id="sign-btn"
        className="bg-[#ddf0ff80] border-[#517ca240] border-[1px] space-x-2 rounded-b-[15px] mt-0  mx-auto max-w-[766px] flex items-center h-[6rem] justify-center mb-2 shadow-md"
      >
        {hashes.length == 0 ? <ButtonDisabled /> : <ButtonEnabled />}
        <img src={info}></img>
      </div>
    </div>
  )
}
