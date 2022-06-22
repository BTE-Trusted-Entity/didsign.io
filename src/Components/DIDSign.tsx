import React from 'react'
import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'
import { useAppSelector } from '../app/hooks'
import BottomLeftBubble from '../ImageAssets/BottomLeftBubble.svg'
import BottomRightBubble from '../ImageAssets/BottomRightBubble.svg'
import { selectPopup } from '../Features/Signer/PopupSlice'

import * as Styled from '../StyledComponents/DidSign'

export const DIDSign = () => {
  const popup = useAppSelector(selectPopup)

  return (
    <Styled.Body>
      {popup && <Styled.DarkOverlay />}

      <Header />
      <Main />
      <Footer />

      <Styled.LeftBubbleImage src={BottomLeftBubble} />
      <Styled.RightBubbleImage src={BottomRightBubble} />
    </Styled.Body>
  )
}
