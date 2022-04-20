import React from 'react'
import { Header } from './Header'
import { MainComponent } from './MainComponent'
import { Footer } from './Footer'
import { BottomSectionSigner } from './BottomSection'
import { useAppSelector } from '../app/hooks'
import { selectUserRole } from '../Features/Signer/UserSlice'
import { BottomSectionVerifyer } from './Verifier/BottomSectionVerifyer'
import BottomLeftBubble from '../ImageAssets/BottomLeftBubble.svg'
import BottomRightBubble from '../ImageAssets/BottomRightBubble.svg'
import { selectPopup } from '../Features/Signer/PopupSlice'
import {
  DarkOverlay,
  LeftBubbleImage,
  RightBubbleImage,
  StyledBody,
} from '../StyledComponents/DidSign'

export const DIDSign = () => {
  const userRoleIsSigner = useAppSelector(selectUserRole)
  const popup = useAppSelector(selectPopup)

  return (
    <StyledBody>
      {popup && <DarkOverlay></DarkOverlay>}
      <Header />
      <MainComponent />
      {userRoleIsSigner ? <BottomSectionSigner /> : <BottomSectionVerifyer />}

      <Footer />
      <LeftBubbleImage src={BottomLeftBubble} />
      <RightBubbleImage src={BottomRightBubble} />
    </StyledBody>
  )
}
