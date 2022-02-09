import React from 'react'
import BigOk from '../SVGAssets/BigOk'
import { useAppSelector } from "../app/hooks"
import { selectSign } from '../Features/Signer/SignatureSlice'
import DownloadBtns from './DownloadBtns'

const Signature = () => {
    const sign = useAppSelector(selectSign)

    return <div className="flex-col space-y-16">
        {/*<div className="flex w-2/3 mx-auto items-center justify-center space-x-2">
            <div className="w-1/6 border-[1px] border-dashed h-px border-signing-label"></div>
            <label className=" w-fit text-signing-label font-[overpass] text-lg text-left">Signed</label>
            <div className="w-2/3 border-[1px] border-dashed h-px border-signing-label"></div>
            <BigOk />

        </div>
        <div className="flex w-3/4 mx-auto items-center justify-center space-x-6">
            <label className=" w-fit font-bold text-black font-[overpass] text-md text-left 2xl:text-[17px]">Signature</label>
            <label className=" w-fit text-black font-[overpass] text-sm text-left 2xl:text-[17px]">{sign}</label>
        </div>*/}
    </div>
}

export default Signature
