import React from 'react'
import logo from '../ImageAssets/logo_DIDsign.png'
function Header() {
  return (
    <div>
      <div className="bg-header w-screen h-[9rem] 2xl:h-[12rem] flex-auto items-center big-phone:h-20">
        <div className=" h-[80%] my-auto w-full">
          <img
            className="ml-[24%] w-1/6 big-phone:w-1/3 h-full 2xl:w-[14%] object-cover"
            src={logo}
          />
        </div>

        <div className="mx-auto w-full h-[20%] bg-[#44374f99] big-phone:h-6 ">
          <p className="w-11/12 h-full ml-[25%] text-left big-phone:w-3/6 text-white font-[Overpass Regular] text-sm tracking-wider big-phone:text-[8px] big-phone:tracking-normal">
            Documents that build trust - securely signed with your Digital
            Identifier (DID)
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header
