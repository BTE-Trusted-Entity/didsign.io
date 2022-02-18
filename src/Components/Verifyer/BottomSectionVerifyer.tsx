import React, { useMemo, useRef } from 'react'
import { useAppSelector } from '../../app/hooks'
import {
  selectEndpointTypes,
  selectEndpointURL,
  selectVerifiedDid,
  selectVerifiedSign,
} from '../../Features/Signer/EndpointSlice'
import OkIcon from '../../ImageAssets/icon_oK.svg'

export function BottomSectionVerifyer() {
  const sign = useAppSelector(selectVerifiedSign)
  const did = useAppSelector(selectVerifiedDid)
  const urls = useAppSelector(selectEndpointURL)
  const types = useAppSelector(selectEndpointTypes)
  const verificationRef = useRef<null | HTMLDivElement>(null)
  const scrollToBottom = () => {
    if (verificationRef.current != null) {
      verificationRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  useMemo(scrollToBottom, [sign])
  function renderSignCom() {
    return (
      <div className="flex flex-col w-[90%] mx-auto ml-3 2xl:space-y-5 mt-10 mb-10 lg:space-y-8 md:space-y-12">
        <div className="flex w-[90%] items-center justify-start space-x-6">
          <p className=" text-green-600 font-[Overpass Regular] text-[16px]">
            Verification
          </p>
          <img src={OkIcon} />{' '}
        </div>
        <div className="w-full flex space-x-3 h-14 justify-start">
          <p className="w-[12%] text-[#2A2231] font-[Overpass Regular] lg:text-[16px] md:text-sm">
            Signature
          </p>
          <span className=" tracking-tighter overflow-wrap break-words text-[#2A2231] font-[Overpass Regular] lg:text-[14px] w-4/5 md:text-sm">
            {sign}
          </span>
        </div>
        <div className="w-full flex space-x-3 h-14 ">
          <span className="  w-[12%] text-[#2A2231] font-[Overpass Regular] lg:text-[16px] md:text-sm">
            Signed By
          </span>
          <span className="tracking-tighter overflow-wrap break-words text-[#2A2231] font-[Overpass Regular] lg:text-[14px] md:text-sm w-4/5">
            {did}
          </span>
        </div>
        <div className="w-full flex space-x-6 h-fit ">
          <span className=" w-[12%]  tracking-tighter text-left text-[#2A2231] font-[Overpass Regular] lg:text-[16px] md:text-sm">
            Service Endpoints
          </span>

          <div className="flex flex-col space-y-2 h-fit w-full">
            {urls.map((url: string, index: number) => (
              <div key={index} className="flex flex-col h-fit space-y-1 ">
                <span className="tracking-tighter overflow-wrap break-words text-[#2A2231] font-[Overpass Regular] lg:text-[14px] md:text-sm w-full">
                  {types[index]}
                </span>
                <span className=" tracking-tighter overflow-wrap break-words text-[#2A2231] font-[Overpass Regular] lg:text-[14px] md:text-sm w-full">
                  {url}
                </span>
                <div className=" border-b-[1px] border-b-gray-900 border-dotted w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className=" bg-bottom-body w-screen relative pb-8">
      <div
        ref={verificationRef}
        className={`bg-[#ddf0ff80] border-solid relative border-[#517ca240] border-2 rounded-b-lg min-h-[7rem] max-h-screen mx-auto w-[48%] big-phone:w-[80%]`}
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
