import React from 'react'
import '../Styles/App.css'
import Header from './Header'
import SignerComponent from './SignerComponent'
import VerifyerComponent from './VerifyerComponent'
import SignVerifyBtn from './SignVerifyBtn'
import { Footer } from './Footer'
import { BottomSectionSigner } from './BottomSection'
import { useAppSelector } from '../app/hooks'
import { selectUser } from '../Features/Signer/UserSlice'
import { BottomSectionVerifyer } from './Verifyer/BottomSectionVerifyer'
import BottomLeftBubble from '../ImageAssets/BottomLeftBubble.svg'

import BottomRightBubble from '../ImageAssets/BottomRightBubble.svg'

function showSigner() {
  return <SignerComponent />
}
function showVerifyer() {
  return <VerifyerComponent />
}
export function DIDSign() {
  const userIsSigner = useAppSelector(selectUser)

  return (
    <div className="relative min-h-screen w-screen overflow-y-auto bg-bottom-body overflow-x-hidden flex flex-col">
      <Header />
      <SignVerifyBtn />
      {userIsSigner ? showSigner() : showVerifyer()}
      {userIsSigner ? <BottomSectionSigner /> : <BottomSectionVerifyer />}
      <Footer />
      <img
        src={BottomLeftBubble}
        className="absolute bottom-0 left-0 h-[234px] w-[220px]  pointer-events-none"
      />
      <img
        src={BottomRightBubble}
        className=" absolute bottom-0 right-0 h-[234px] w-[220px] pointer-events-none"
      />
    </div>
  )
}
