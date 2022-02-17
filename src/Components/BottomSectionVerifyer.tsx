import React from 'react'
import { useAppSelector } from '../app/hooks'
import { selectDid, selectSign } from '../Features/Signer/SignatureSlice'
import OkIcon from '../ImageAssets/icon_oK.svg'

export function BottomSectionVerifyer() {
  const sign = useAppSelector(selectSign)
  const did = useAppSelector(selectDid)
  function renderSignCom() {
    return (
      <div className="flex flex-col w-[90%] mx-auto ml-3 2xl:space-y-5 mt-10 mb-10 lg:space-y-10 md:space-y-12">
        <div className="flex w-[90%] items-center justify-start space-x-6">
          <p className=" text-green-600 font-[Overpass Regular] text-[16px]">
            Verification
          </p>
          <img src={OkIcon} />{' '}
        </div>
        <div className="w-full flex space-x-6 h-14">
          <p className=" text-black font-[Overpass Regular] lg:text-[16px] md:text-sm">
            Signature
          </p>
          <span className="overflow-wrap break-words text-black font-[Overpass Regular] lg:text-[16px] w-4/5 md:text-sm">
            {sign}
          </span>
        </div>
        <div className="w-full flex space-x-6 h-14">
          <span className=" text-black font-[Overpass Regular] lg:text-[16px] md:text-sm">
            Signed By
          </span>
          <span className="overflow-wrap break-words text-black font-[Overpass Regular] lg:text-[16px] md:text-sm w-4/5">
            {did}
          </span>
        </div>
      </div>
    )
  }
  return (
    <div className=" bg-bottom-body w-screen relative pb-8">
      <div
        className={`bg-[#ddf0ff80] border-solid relative border-[#517ca240] border-2 rounded-b-lg min-h-[7rem] max-h-screen mx-auto w-[48%]`}
      >
        {sign != '' ? (
          renderSignCom()
        ) : (
          <span className="absolute top-2 left-4 text-[#2a223180]">
            {' '}
            Verification
          </span>
        )}
      </div>
    </div>
  )
}
