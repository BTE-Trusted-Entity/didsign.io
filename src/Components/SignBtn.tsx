import React, { useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { updateSign, updateDID } from '../Features/Signer/SignatureSlice'
import { openSporan, generateJWS } from '../Utils/sign-helpers'
import { selectFinalHash, selectHash } from '../Features/Signer/hashSlice'
import {
  addBufferTop,
  addFileTop,
  IBuffer,
  selectFile,
} from '../Features/Signer/FileSlice'
import { Signature, SignDoc } from '../Utils/types'
import InfoIcon from '../ImageAssets/iconBIG_info.svg'
import AttentionIcon from '../ImageAssets/iconBIG_attention.svg'
import CenterLeftBubble from '../ImageAssets/CenterLeftBubble.svg'
import info from '../ImageAssets/icon_info.svg'
import { showPopup } from '../Features/Signer/PopupSlice'
import { SignInfoPopup } from './Popups'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export const SignBtn = () => {
  const [signStatus, setSignStatus] = useState<
    boolean | 'Default' | 'No Sporran'
  >('Default')
  const [popupIcon, setPopupIcon] = useState<string>(InfoIcon)
  const sporranPopup = useRef<null | HTMLDivElement>(null)
  const [signPopup, setSignPopup] = useState<boolean>(false)
  const targetElement = document.querySelector('body')
  const files = useAppSelector(selectFile)

  const handleChange = async () => {
    if (hashes.length == 0) {
      return
    }
    dispatch(showPopup(true))
    sporranPopup.current?.classList.remove('invisible')
    if (targetElement !== null) {
      disableBodyScroll(targetElement)
    }
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

        const newFile = new File([blob], 'signature.didsign')
        const newBufferObj: IBuffer = {
          buffer: await newFile.arrayBuffer(),
          name: newFile.name,
        }
        dispatch(addBufferTop(newBufferObj))
        dispatch(addFileTop(newFile))
        dispatch(showPopup(false))
        if (targetElement !== null) {
          enableBodyScroll(targetElement)
        }
      })

      .catch((e) => {
        if (e.toString().includes('Rejected')) {
          if (targetElement !== null) {
            disableBodyScroll(targetElement)
          }
          if (window.kilt.sporran == undefined) {
            setSignStatus('No Sporran')

            setPopupIcon(InfoIcon)
          } else {
            setPopupIcon(AttentionIcon)

            setSignStatus(false)
          }
        }
      })
  }

  const ButtonDisabled = () => {
    return (
      <button
        className="font-['Overpass'] text-[14px] leading-[16px] pointer-events-none  tracking-[0.1px] text-[#ffffff80] text-center w-[160px] h-[30px] mt-4 mb-4 rounded-md 
                my-auto bg-greyish-blue shadow-md"
        onClick={handleChange}
      >
        SIGN
      </button>
    )
  }
  const ButtonEnabled = () => {
    return (
      <>
        <button
          className="font-['Overpass'] text-[14px] leading-[16px]  tracking-[0.1px] text-white text-center w-[160px] h-[30px] mt-4 mb-4 rounded-md 
    my-auto bg-medium-blue shadow-md"
          onClick={handleChange}
        >
          SIGN
        </button>
      </>
    )
  }

  const hashes = useAppSelector(selectHash)
  const finalHash = useAppSelector(selectFinalHash)

  const dispatch = useAppDispatch()

  const handleDismiss = () => {
    if (targetElement !== null) {
      enableBodyScroll(targetElement)
    }
    dispatch(showPopup(false))
    setPopupIcon(InfoIcon)
    setSignStatus('Default')
    sporranPopup.current?.classList.add('invisible')
  }
  const showSignPopup = () => {
    if (targetElement !== null) {
      disableBodyScroll(targetElement)
    }
    setSignPopup(true)
    dispatch(showPopup(true))
  }
  const handleSignDismiss = () => {
    if (targetElement !== null) {
      enableBodyScroll(targetElement)
    }
    dispatch(showPopup(false))
    setSignPopup(false)
  }
  return (
    <div>
      <div
        ref={sporranPopup}
        className="invisible z-40 fixed max-w-[300px] mx-auto h-[fit] bg-silver-blue shadow-2xl rounded-[15px] left-1/2 top-1/4 mt-[3%] -ml-[150px] phone:overflow-y-auto"
      >
        <div className="flex text-dark-purple relative flex-col w-full h-full items-center mt-4 space-y-5 pl-4 pr-4 pb-4 ">
          <img
            src={CenterLeftBubble}
            className="absolute bottom-0 left-0 mt-auto pointer-events-none"
          />
          <div>
            <img src={popupIcon} />
          </div>
          {signStatus === 'Default' && (
            <span className="font-['Overpass'] text-[18px] leading-[20px] tracking-[0.13px]">
              Signature needed
            </span>
          )}
          {signStatus === 'No Sporran' && (
            <span className="font-['Overpass'] tracking-[0.13px] text-lg ">
              No Wallet Found
            </span>
          )}
          {signStatus === 'Default' && (
            <p className="font-['Overpass'] tracking-[0.13px] text-[16px] pl-4 pr-4 text-left">
              Please wait for your wallet extension to open and sign the
              transaction there.
            </p>
          )}{' '}
          {signStatus === false && (
            <span className="font-['Overpass'] tracking-[0.13px]  text-[16px] pl-4 pr-4 text-justify">
              It looks like error occured while signing. Please try again.
            </span>
          )}
          {signStatus === 'No Sporran' && (
            <p className="font-['Overpass'] tracking-[0.13px] text-[16px] pl-4 pr-4 text-left">
              To sign your files with DIDsign you need an on-chain DID in a
              wallet that supports it. We recommend Sporran, a browser extension
              available for Google Chrome and Firefox. Any other wallet
              supporting on-chain signing on the KILT blockchain can also be
              used.
            </p>
          )}
          <button
            onClick={handleDismiss}
            className="font-['Overpass'] rounded-[8px] w-[130px] text-[12px] leading-[12px]  tracking-[0.1px] pl-4 pr-4 text-center h-[22px] bg-medium-blue text-white"
          >
            DISMISS
          </button>
        </div>
      </div>

      <div className="bg-light-blue bg-opacity-80 border-[#517ca240] border-[1px] rounded-b-[15px] mt-0  mx-auto max-w-[766px] flex items-center h-[6rem] justify-center mb-4 shadow-md flex-col">
        <div
          id="sign-btn"
          className="flex items-center justify-center space-x-2"
        >
          {files.length === 0 ? <ButtonDisabled /> : <ButtonEnabled />}
          <button onClick={showSignPopup}>
            <img src={info} />
          </button>
          {signPopup && <SignInfoPopup dismiss={handleSignDismiss} />}
        </div>
        <div className="font-['Overpass'] text-[12px] leading-[12px]  tracking-[0.1px] mb-2">
          Don&apos;t have an on-chain DID yet?{' '}
          <a
            target="_blank"
            rel="noreferrer"
            className="hover:underline text-medium-blue"
            href="https://support.kilt.io/support/solutions/folders/80000689099"
          >
            Read here
          </a>
        </div>
      </div>
    </div>
  )
}
