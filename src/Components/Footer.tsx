import React from 'react'
import Logo from '../ImageAssets/logo_DIDsign.svg'

export function Footer() {
  return (
    <div
      className={`bg-header flex h-12 2xl:h-16 w-screen relative mt-auto items-center justify-center big-phone:h-24 `}
    >
      <img
        className="absolute lg:left-[26%] h-8 mt-0 w-fit md:left-[23%]"
        src={Logo}
      />

      <div className="items-center flex-wrap justify-center mx-auto w-fit space-x-2 absolute">
        <span className="text-white font-['Overpass'] lg:text-[16px] 2xl:text-[20px] md:text-xs">
          Imprint{' '}
        </span>
        <span className="text-white font-['Overpass'] lg:text-[16px] 2xl:text-[20px] md:text-xs">
          -
        </span>
        <span className="text-white font-['Overpass'] lg:text-[16px] 2xl:text-[20px] md:text-xs">
          Terms and Conditions
        </span>
        <span className="text-white font-['Overpass'] lg:text-[16px] 2xl:text-[20px] md:text-xs">
          -
        </span>
        <span className="text-white font-['Overpass'] lg:text-[16px] 2xl:text-[20px] md:text-xs">
          Privacy Policy{' '}
        </span>
      </div>
    </div>
  )
}
