import React, { useState } from 'react'
import { ImprintPopup } from './Popups'
import { useAppDispatch } from '../app/hooks'
import { showPopup } from '../Features/Signer/PopupSlice'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Terms from '../DocsAssets/Terms_of_Use_for_DIDsign_June2022.pdf'
import Privacy from '../DocsAssets/Privacy_Policy_DIDsign_June_2022.pdf'

import * as Styled from '../StyledComponents/Footer'

export const Footer = () => {
  const targetElement = document.querySelector('body')
  const [showImprint, setShowImprint] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const handleImprint = () => {
    dispatch(showPopup(true))
    setShowImprint(true)
    if (targetElement !== null) {
      disableBodyScroll(targetElement)
    }
  }
  const handleDismiss = () => {
    if (targetElement !== null) {
      enableBodyScroll(targetElement)
    }
    dispatch(showPopup(false))

    setShowImprint(false)
  }
  return (
    <Styled.Footer>
      <Styled.FooterLinks>
        <Styled.Links>
          <span>
            <Styled.Imprint onClick={handleImprint}>Imprint </Styled.Imprint>
          </span>
          <span>-</span>
          <a href={Terms} target="_blank" rel="noreferrer">
            <span>Terms and Conditions</span>
          </a>
          <span>-</span>
          <a href={Privacy} target="_blank" rel="noreferrer">
            <span>Privacy Policy</span>
          </a>
        </Styled.Links>
      </Styled.FooterLinks>

      {showImprint && <ImprintPopup onDismiss={handleDismiss} />}
    </Styled.Footer>
  )
}
