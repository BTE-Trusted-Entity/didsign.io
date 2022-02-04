import React from 'react'
import logo from '../ImageAssets/logo_DIDsign.png'
function Header() {
    return <div>
        <div className="bg-header w-screen h-40 2xl:h-52 flex-auto">
            <div className="flex items-left justify-center my-auto h-full w-3/4 3xl:w-10/12">
                <img className="w-60 h-44" src={logo} /></div>
        </div>
        
        <div className="w-full h-10 bg-header/95 flex items-center justify-center">
            <p className="w-3/4 text-center text-white font-['Overpass'] text-base tracking-wider big-phone:text-[12px] big-phone:tracking-tight">Documents that build trust - securely signed with your Digital Identifier (DID).</p>
        </div>
    </div>
}

export default Header
