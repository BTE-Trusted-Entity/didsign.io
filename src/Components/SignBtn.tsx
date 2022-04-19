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
import { BtnContainer, SignButton } from '../StyledComponents/SignBtn'
import {
  Container,
  Heading,
  StyledPopup,
  Text,
  Wrapper,
} from '../StyledComponents/Popup'

const SignPopup = () => {
  return (
    <Container>
      <StyledPopup>
        <Wrapper>
          <img src={InfoIcon} />
          <Heading>Signature Needed</Heading>
          <Text>
            Please wait for your wallet extension to open and sign the
            transaction there.
          </Text>
          <SignButton isDisabled={false}>Dismiss</SignButton>
        </Wrapper>
      </StyledPopup>
    </Container>
  )
}

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
        if (targetElement !== null) disableBodyScroll(targetElement)

        if (window.kilt.sporran == undefined) {
          setSignStatus('No Sporran')

          setPopupIcon(InfoIcon)
        } else {
          if (e.toString().includes('Rejected')) {
            setPopupIcon(AttentionIcon)

            setSignStatus(false)
          }
        }
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
    <BtnContainer
      id="sign-btn"
      className="flex items-center justify-center space-x-2"
    >
      <SignButton isDisabled={files.length === 0}>Sign</SignButton>
      <button onClick={showSignPopup}>
        <img src={info} />
      </button>
      {signPopup && <SignInfoPopup dismiss={handleSignDismiss} />}
      <SignPopup />
    </BtnContainer>
  )
}
