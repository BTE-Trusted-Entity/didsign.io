import React from 'react'
import { Header } from './Header'
import { SignerComponent } from './SignerComponent'
import { VerifierComponent } from './VerifierComponent'
import { SelectUserRoleBtns } from './SelectUserRoleBtns'
import { Footer } from './Footer'
import { BottomSectionSigner } from './BottomSection'
import { useAppSelector } from '../app/hooks'
import { selectUserRole } from '../Features/Signer/UserSlice'
import { BottomSectionVerifyer } from './Verifier/BottomSectionVerifyer'
import BottomLeftBubble from '../ImageAssets/BottomLeftBubble.svg'

import BottomRightBubble from '../ImageAssets/BottomRightBubble.svg'
import { selectPopup } from '../Features/Signer/PopupSlice'

export const DIDSign = () => {
  const userRoleIsSigner = useAppSelector(selectUserRole)
  const popup = useAppSelector(selectPopup)

  return (
    <div
      className={`relative min-h-screen w-screen overflow-y-auto bg-bottom-body overflow-x-hidden flex flex-col ${
        popup && 'overflow-hidden'
      }`}
    >
      {popup && (
        <div className="bg-black opacity-70 absolute w-full h-full z-30 overflow-y-hidden"></div>
      )}
      <Header />
      <SelectUserRoleBtns />
      {userRoleIsSigner ? <SignerComponent /> : <VerifierComponent />}
      {userRoleIsSigner ? <BottomSectionSigner /> : <BottomSectionVerifyer />}
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
