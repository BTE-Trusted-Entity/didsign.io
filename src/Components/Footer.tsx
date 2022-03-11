import React, { useState } from 'react'
import Logo from '../ImageAssets/logo_DIDsign.svg'
import KiltLogo from '../ImageAssets/Kilt.svg'
import { ImprintPopup } from './Popups'
import { useAppDispatch } from '../app/hooks'
import { showPopup } from '../Features/Signer/PopupSlice'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

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
    <div className=" bg-dark-purple flex items-center justify-center   h-[35px] w-screen relative mt-auto  big-phone:h-28 ">
      <div className="flex items-center justify-center w-[766px] h-full relative">
        <img
          className=" h-[27px] absolute left-0 small-device:pl-[15px] phone:invisible"
          src={Logo}
        />

        <div className="items-center flex flex-wrap max-w-3/4 justify-center space-x-2 text-white font-['Overpass'] text-[14px] leading-[16px] tracking-[0.1px]">
          <button className="hover:underline" onClick={handleImprint}>
            <span>Imprint </span>
          </button>
          <span>-</span>
          <button className="hover:underline">
            <a
              href={require('./DocsAssets/Terms.pdf')}
              target="_blank"
              rel="noreferrer"
            >
              <span>Terms and Conditions</span>
            </a>
          </button>
          <span>-</span>
          <button className="hover:underline">
            <a
              href={require('./DocsAssets/Privacy.pdf')}
              target="_blank"
              rel="noreferrer"
            >
              <span>Privacy Policy </span>
            </a>
          </button>
        </div>

        <img
          className=" h-[15px] absolute right-0 big-phone:invisible small-device:pr-[15px] phone:invisible "
          src={KiltLogo}
        />
      </div>
      {showImprint && <ImprintPopup dismiss={handleDismiss} />}
    </div>
  )
}
