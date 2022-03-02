import React, { useMemo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  clearEndpoint,
  fileStatus,
  selectEndpointTypes,
  selectEndpointURL,
  selectVerifiedDid,
  selectVerifiedSign,
} from '../../Features/Signer/EndpointSlice'
import OkIcon from '../../ImageAssets/icon_oK.svg'
import BtnStartOver from '../../ImageAssets/button_start_over_NEW.svg'
import { clearAll, clearFileName } from '../../Features/Signer/FileSlice'
import { clearHash } from '../../Features/Signer/hashSlice'
import AttentionIcon from '../../ImageAssets/icon_attention.svg'
import {
  clearJWS,
  selectJwsSignStatus,
} from '../../Features/Signer/VerifyJwsSlice'

export const BottomSectionVerifyer = () => {
  const sign = useAppSelector(selectVerifiedSign)
  const did = useAppSelector(selectVerifiedDid)
  const urls = useAppSelector(selectEndpointURL)
  const types = useAppSelector(selectEndpointTypes)
  const status = useAppSelector(fileStatus)
  const jwsStatus = useAppSelector(selectJwsSignStatus)

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
    dispatch(clearHash())
    dispatch(clearJWS())
    ;(document.getElementById('dropzone') as HTMLDivElement).draggable = false
    ;(
      document.getElementById('dropzone') as HTMLDivElement
    ).style.pointerEvents = 'none'
  }
  const renderVerificationError = () => {
    return (
      <div className="flex flex-col w-[90%] mx-auto ml-3  mt-10 mb-10 space-y-[40px]">
        <div className="flex w-full items-center justify-self-start space-x-[10px]">
          <p className=" text-[#F06543] font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px] w-[12%]">
            Verification
          </p>
          <img src={AttentionIcon} />{' '}
        </div>
        <div className="max-w-full flex w-[698px] space-x-[20px]">
          <p className=" text-[#F06543] font-['Overpass'] text-[16px] leading-[22px] tracking-[0.11px">
            Attention
          </p>
          <span className=" overflow-wrap break-words text-[#F06543] font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
            The signature does not match with the imported files. Please make
            sure to import the correct files.
          </span>
        </div>
      </div>
    )
  }
  const showSignatureError = () => {
    return (
      <div className="flex flex-col w-[90%] mx-auto ml-3  mt-10 mb-10 space-y-[40px]">
        <div className="flex w-full items-center justify-self-start space-x-[10px]">
          <p className=" text-[#F06543] font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px] w-[12%]">
            Verification
          </p>
          <img src={AttentionIcon} />{' '}
        </div>
        <div className="max-w-full flex w-[698px] space-x-[20px]">
          <p className=" text-[#F06543] font-['Overpass'] text-[16px] leading-[22px] tracking-[0.11px">
            Attention
          </p>
          <span className=" overflow-wrap break-words text-[#F06543] font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
            The signature file is corrupted. Please make sure to import the
            correct signature file.
          </span>
        </div>
      </div>
    )
  }
  const renderSignCom = () => {
    if (status.includes(false)) {
      return renderVerificationError()
    } else {
      return (
        <div className="flex flex-col w-[90%] mx-auto ml-3  mt-10 mb-10 space-y-[40px]">
          <div className="flex w-full items-center justify-self-start space-x-[10px]">
            <p className=" text-green-600 font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px] w-[12%]">
              Verification
            </p>
            <img src={OkIcon} />{' '}
          </div>
          <div className="max-w-full flex w-[698px] space-x-[20px]">
            <p className="text-[#2A2231] font-['Overpass'] text-[16px] leading-[22px] tracking-[0.11px]">
              Signature
            </p>
            <span className="overflow-wrap break-words w-4/5 h-[18px] text-[#2A2231] font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
              {sign}
            </span>
          </div>
          <div className="max-w-full  flex w-[698px] space-x-[20px] flex-wrap  ">
            <p className="  text-[#2A2231] font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px]">
              Signed By
            </p>
            <span className="overflow-wrap break-words h-[18px] w-4/5 text-[#2A2231] font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
              {did}
            </span>
          </div>
          <div className="max-w-full flex w-[698px] space-x-[20px]">
            <span className="text-[#2A2231] w-[74px] text-right font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px]">
              Service Endpoints
            </span>

            <div className="flex flex-col space-y-2 h-fit w-4/5">
              {urls.map((url: string, index: number) => (
                <div key={index} className="flex flex-col h-fit space-y-1 ">
                  <span className=" overflow-wrap break-words text-[#2A2231] font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
                    {types[index]}
                  </span>
                  <span className="overflow-wrap break-words text-[#2A2231] font-['Overpass'] text-[14px] leading-[16px] tracking-[0.1px]">
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
  }
  if (!jwsStatus) {
    return (
      <div className=" bg-bottom-body w-screen relative pl-2 pr-2">
        <div
          ref={verificationRef}
          className={`bg-[#ddf0ff80] border-solid relative border-[#517ca240] border-[1px] rounded-b-[15px] min-h-[6rem] max-h-screen mx-auto max-w-[766px] mb-2 shadow-md`}
        >
          {showSignatureError()}
          <button
            className="absolute -right-1 -bottom-1"
            onClick={handleStartOver}
          >
            <img className="h-12 w-12" src={BtnStartOver} />
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className=" bg-bottom-body w-screen relative pl-2 pr-2">
        <div
          ref={verificationRef}
          className={`bg-[#ddf0ff80] border-solid relative border-[#517ca240] border-[1px] rounded-b-[15px] min-h-[6rem] max-h-screen mx-auto max-w-[766px] mb-2 shadow-md`}
        >
          {sign != '' ? (
            renderSignCom()
          ) : (
            <span className="absolute top-6 left-10 font-['Overpass'] text-[#2a223180] text-[16px] leading-[17px] tracking-[0.11px]">
              {' '}
              Verification
            </span>
          )}
          {sign != '' && (
            <button
              className="absolute -right-1 -bottom-1"
              onClick={handleStartOver}
            >
              <img className="h-12 w-12" src={BtnStartOver} />
            </button>
          )}
        </div>
      </div>
    )
  }
}
