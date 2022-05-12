import React, { useState } from 'react'
import Logo from '../ImageAssets/logo_DIDsign.svg'
import { ReactComponent as KiltLogo } from '../ImageAssets/Kilt.svg'
import { ImprintPopup } from './Popups'
import { useAppDispatch } from '../app/hooks'
import { showPopup } from '../Features/Signer/PopupSlice'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Terms from '../DocsAssets/Terms_of_Use_DIDsign_March_2022.pdf'
import Privacy from '../DocsAssets/Privacy_Policy_DIDsign_March_2022.pdf'
import {
  DidSignLogoContainer,
  LinksContainer,
  LogoContainer,
  StyledFooter,
  StyledFooterLinksContainer,
} from '../StyledComponents/Footer'

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
    <StyledFooter>
      <StyledFooterLinksContainer>
        <DidSignLogoContainer>
          <img src={Logo} />
        </DidSignLogoContainer>

        <LinksContainer>
          <span onClick={handleImprint}>Imprint </span>
          <span>-</span>
          <a href={Terms} target="_blank" rel="noreferrer">
            <span>Terms and Conditions</span>
          </a>
          <span>-</span>
          <a href={Privacy} target="_blank" rel="noreferrer">
            <span>Privacy Policy</span>
          </a>
        </LinksContainer>

        <LogoContainer>
          <KiltLogo />
        </LogoContainer>
      </StyledFooterLinksContainer>
      {showImprint && <ImprintPopup dismiss={handleDismiss} />}
    </StyledFooter>
  )
}
