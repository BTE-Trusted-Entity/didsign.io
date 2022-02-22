import React, { useMemo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  clearEndpoint,
  selectEndpointTypes,
  selectEndpointURL,
  selectVerifiedDid,
  selectVerifiedSign,
} from '../../Features/Signer/EndpointSlice'
import OkIcon from '../../ImageAssets/icon_oK.svg'
import BtnStartOver from '../../ImageAssets/button_start_over_NEW.svg'
import { clearAll, clearFileName } from '../../Features/Signer/FileSlice'
import { clearHash } from '../../Features/Signer/hashSlice'

export function BottomSectionVerifyer() {
  const sign = useAppSelector(selectVerifiedSign)
  const did = useAppSelector(selectVerifiedDid)
  const urls = useAppSelector(selectEndpointURL)
  const types = useAppSelector(selectEndpointTypes)
  const verificationRef = useRef<null | HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const scrollToBottom = () => {
    if (verificationRef.current != null) {
      verificationRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  useMemo(scrollToBottom, [sign])
  const handleStartOver = () => {
    dispatch(clearEndpoint())
    dispatch(clearAll())
    dispatch(clearHash())
    dispatch(clearFileName())
  }

  function renderSignCom() {
    return (
      <div className="flex flex-col w-[90%] mx-auto ml-3 2xl:space-y-5 mt-10 mb-10 sm:space-y-5 big-phone:space-y-12">
        <div className="flex w-[90%] items-center justify-start space-x-5">
          <p className=" text-green-600 font-['Overpass'] text-[16px]">
            Verification
          </p>
          <img src={OkIcon} />{' '}
        </div>
        <div className="w-full flex flex-wrap lg:space-x-3 md:space-x-5 h-14 justify-start">
          <p className="pr-4 w-[12%] text-[#2A2231] font-[Overpass Regular] lg:text-[16px] 2xl:text-[20px] big-phone:text-[12px]">
            Signature
          </p>
          <span className=" tracking-tighter overflow-wrap break-words text-[#2A2231] font-['Overpass'] 2xl:text-[18px] lg:text-[14px] w-4/5 big-phone:text-[10px]">
            {sign}
          </span>
        </div>
        <div className="w-full flex flex-wrap  lg:space-x-3 md:space-x-5 h-14 justify-start ">
          <span className="pr-4 w-[12%] text-[#2A2231] font-['Overpass'] lg:text-[16px] big-phone:text-[12px] 2xl:text-[20px]">
            Signed By
          </span>
          <span className="tracking-tighter overflow-wrap break-words text-[#2A2231] font-['Overpass'] lg:text-[14px] big-phone:text-[10px] w-4/5 2xl:text-[18px]">
            {did}
          </span>
        </div>
        <div className="w-full flex flex-wrap lg:space-x-3 md:space-x-5 h-fit ">
          <span className="pr-4 w-[12%]   tracking-tighter text-left text-[#2A2231] font-['Overpass'] lg:text-[16px] big-phone:text-[12px] 2xl:text-[20px]">
            Service Endpoints
          </span>

          <div className="flex flex-col space-y-2 h-fit w-4/5">
            {urls.map((url: string, index: number) => (
              <div key={index} className="flex flex-col h-fit space-y-1 ">
                <span className="tracking-tighter overflow-wrap break-words text-[#2A2231] font-['Overpass'] lg:text-[14px] big-phone:text-[10px]  w-full 2xl:text-[18px]">
                  {types[index]}
                </span>
                <span className=" tracking-tighter overflow-wrap break-words text-[#2A2231] font-['Overpass'] lg:text-[14px] big-phone:text-[10px] w-full 2xl:text-[18px]">
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
    <div className=" bg-bottom-body w-screen relative">
      <div
        ref={verificationRef}
        className={`bg-[#ddf0ff80] border-solid relative border-[#517ca240] border-[1px] rounded-b-lg min-h-[6rem] max-h-screen mx-auto w-[48%] big-phone:w-[80%] mb-8 shadow-md`}
      >
        {sign != '' ? (
          renderSignCom()
        ) : (
          <span className="absolute top-2 left-4 text-[#2a223180]">
            {' '}
            Verification
          </span>
        )}
        <button
          className="absolute -right-1 -bottom-1"
          onClick={handleStartOver}
        >
          <img className="h-12 w-12" src={BtnStartOver} />
        </button>
      </div>
    </div>
  )
}
