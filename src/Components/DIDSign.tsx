import React from 'react'
import { Header } from './Header'
import { MainComponent } from './MainComponent'
import { Footer } from './Footer'
import { BottomSectionComponent } from './BottomSectionComponent'
import { useAppSelector } from '../app/hooks'
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
  const popup = useAppSelector(selectPopup)

  return (
    <StyledBody>
      {popup && <DarkOverlay></DarkOverlay>}
      <Header />
      <MainComponent />
      <BottomSectionComponent />
      <Footer />
      <LeftBubbleImage src={BottomLeftBubble} />
      <RightBubbleImage src={BottomRightBubble} />
    </StyledBody>
  )
}
