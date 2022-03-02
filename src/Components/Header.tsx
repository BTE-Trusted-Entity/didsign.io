import React from 'react'
import logo from '../ImageAssets/logo_DIDsign.svg'
import TopRightBubble from '../ImageAssets/TopRightBubble.svg'
import TopLeftBubble from '../ImageAssets/TopLeftBubble.svg'

export const Header = () => {
  return (
    <div>
      <div className="bg-header w-screen h-[96px] flex flex-col relative ">
        <img
          src={TopLeftBubble}
          className="absolute top-0 left-0 pointer-events-none h-full"
        />
        <img
          src={TopRightBubble}
          className="absolute top-0 right-0 pointer-events-none h-full"
        />

        <div className=" content-end w-[766px]  my-auto mx-auto small-device:pl-[15px] z-20 phone:pt-4">
          <img className="w-[168.55px] h-[52px]  object-cover" src={logo} />
        </div>

        <div className="mb-0 w-full h-[24px] bg-[#44374f99]  flex items-center phone:invisible">
          <span className=" small-device:pl-[15px] mx-auto pt-[1px] h-[18px] w-[766px] text-white font-['Overpass'] text-[14px] leading-[16px] tracking-[0.1px]">
            Documents that build trust - securely signed with your decentralized
            Identifier (DID)
          </span>
        </div>
      </div>
    </div>
  )
}
