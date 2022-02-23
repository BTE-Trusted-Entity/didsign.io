import React from 'react'
import logo from '../ImageAssets/logo_DIDsign.svg'
function Header() {
  return (
    <div>
      <div className="bg-header w-screen h-[9rem] 2xl:h-[12rem] flex-auto items-center big-phone:h-20">
        <div className=" ml-[26%] h-[80%] my-auto w-1/6 2xl:w-[14%]">
          <img
            className=" ml-0 w-full big-phone:w-1/3 h-full  object-fill"
            src={logo}
          />
        </div>

        <div className="mx-auto w-full h-[20%] bg-[#44374f99] big-phone:h-6 flex items-center ">
          <p className="leading-loose w-[70%]  h-full  ml-[26%] text-left big-phone:w-3/6 text-white font-['Overpass'] text-[14px] tracking-wider big-phone:text-[8px] big-phone:tracking-normal">
            Documents that build trust - securely signed with your Decentralized
            Identifier (DID)
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header
