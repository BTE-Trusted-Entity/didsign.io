import React, { useEffect } from 'react'
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
import TopRightBubble from '../ImageAssets/TopRightBubble.svg'
import TopLeftBubble from '../ImageAssets/TopLeftBubble.svg'
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
    <div className="relative min-h-screen w-screen overflow-y-scroll bg-bottom-body overflow-x-hidden flex flex-col scrollbar-thin scrollbar-thumb-sky-700">
      <img
        src={TopLeftBubble}
        className="absolute top-0 left-0 h-[150px] big-phone:h-[60px] pointer-events-none"
      />
      <img
        src={TopRightBubble}
        className="absolute top-0 right-0 big-phone:h-[60px] pointer-events-none"
      />
      <Header />
      <SignVerifyBtn />
      {userIsSigner ? showSigner() : showVerifyer()}
      {userIsSigner ? <BottomSectionSigner /> : <BottomSectionVerifyer />}
      <Footer />
      <img
        src={BottomLeftBubble}
        className="absolute bottom-0 left-0 w-1/4 big-phone:h-[120px] mt-auto pointer-events-none"
      />
      <img
        src={BottomRightBubble}
        className=" absolute bottom-0 right-0 w-1/4 big-phone:h-[120px] mt-auto pointer-events-none"
      />
    </div>
  )
}
