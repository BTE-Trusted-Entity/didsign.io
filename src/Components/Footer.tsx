import React from 'react'
import Logo from '../ImageAssets/logo_DIDsign.svg'

export function Footer() {
  return (
    <div
      className={`bg-header flex h-12 2xl:h-16 w-screen relative mt-auto items-center justify-center big-phone:h-fit`}
    >
      <img className="absolute left-[24%] h-8 mt-0 w-[6%] " src={Logo} />

      <div className="flex items-center flex-wrap justify-center mx-auto w-fit space-x-2 absolute">
        <span className="text-white font-[Overpass Regular] lg:text-md 2xl:text-lg md:text-sm">
          Imprint{' '}
        </span>
        <span className="text-white font-[Overpass Regular] lg:text-md 2xl:text-lg md:text-sm">
          -
        </span>
        <span className="text-white font-[Overpass Regular] lg:text-md 2xl:text-lg md:text-sm">
          Terms and Conditions
        </span>
        <span className="text-white font-[Overpass Regular] lg:text-md 2xl:text-lg md:text-sm">
          -
        </span>
        <span className="text-white font-[Overpass Regular] lg:text-md 2xl:text-lg md:text-sm">
          Privacy Policy{' '}
        </span>
      </div>
    </div>
  )
}
