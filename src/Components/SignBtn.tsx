import React, { useState } from 'react'
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
import info from '../ImageAssets/icon_info.svg'
import { showPopup } from '../Features/Signer/PopupSlice'
import {
  NoWalletPopup,
  SignErrorPopup,
  SignPopup,
  SignBtnInfoPopup,
} from './Popups'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import {
  BtnContainer,
  OnchainInfoSpan,
  SignButton,
  SignContainer,
} from '../StyledComponents/SignBtn'

export const SignBtn = () => {
  const [signStatus, setSignStatus] = useState<
    'SignError' | 'Default' | 'No Sporran' | null
  >(null)
  const targetElement = document.querySelector('body')
  const files = useAppSelector(selectFile)
  const [signPopup, setSignPopup] = useState<boolean>(false)

  const generateSignatureFile = async (blob: Blob) => {
    const newFile = new File([blob], 'signature.didsign')
    const newBufferObj: IBuffer = {
      buffer: await newFile.arrayBuffer(),
      name: newFile.name,
    }
    dispatch(addBufferTop(newBufferObj))
    dispatch(addFileTop(newFile))
  }
  const handleChange = async () => {
    if (hashes.length == 0) {
      return
    }
    dispatch(showPopup(true))
    if (targetElement !== null) {
      disableBodyScroll(targetElement)
      setSignStatus('Default')
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
        await generateSignatureFile(blob)
        dispatch(showPopup(false))
        if (targetElement !== null) enableBodyScroll(targetElement)
      })
      .catch((e) => {
        targetElement !== null && disableBodyScroll(targetElement)
        if (window.kilt.sporran == undefined) setSignStatus('No Sporran')
        else e.toString().includes('Rejected') && setSignStatus('SignError')
      })
  }
  const hashes = useAppSelector(selectHash)
  const finalHash = useAppSelector(selectFinalHash)
  const dispatch = useAppDispatch()
  const handleDismiss = () => {
    if (targetElement !== null) {
      enableBodyScroll(targetElement)
    }
    dispatch(showPopup(false))
    setSignStatus(null)
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
    <SignContainer>
      <BtnContainer>
        <SignButton
          isDisabled={files.length === 0}
          onClick={() => handleChange()}
        >
          Sign
        </SignButton>
        <button onClick={showSignPopup}>
          <img src={info} />
        </button>

        {signPopup && <SignBtnInfoPopup dismiss={handleSignDismiss} />}
        {signStatus === 'Default' && <SignPopup dismiss={handleDismiss} />}
        {signStatus === 'No Sporran' && (
          <NoWalletPopup dismiss={handleDismiss} />
        )}
        {signStatus === 'SignError' && (
          <SignErrorPopup dismiss={handleDismiss} />
        )}
      </BtnContainer>
      <OnchainInfoSpan>
        Don&apos;t have an on-chain DID yet?{' '}
        <a
          target="_blank"
          rel="noreferrer"
          className="hover:underline text-medium-blue"
          href="https://support.kilt.io/support/solutions/folders/80000689099"
        >
          Read here
        </a>
      </OnchainInfoSpan>
    </SignContainer>
  )
}
