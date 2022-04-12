import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  clearEndpoint,
  clearFileStatuses,
  fileStatus,
  selectServiceEndpoints,
  selectVerifiedDid,
  selectVerifiedSign,
  selectW3Name,
} from '../../Features/Signer/EndpointSlice'
import OkIcon from '../../ImageAssets/icon_oK.svg'
import BtnStartOver from '../../ImageAssets/button_start_over_NEW.svg'
import { clearAll, clearFileName } from '../../Features/Signer/FileSlice'
import { clearHash } from '../../Features/Signer/hashSlice'
import {
  clearJWS,
  selectJwsSign,
  selectJwsSignStatus,
} from '../../Features/Signer/VerifyJwsSlice'
import spinner from '../../ImageAssets/puff.svg'

import { JWSErrorsComponent } from './JWSErrorsComponent'
import { InvalidFileStatusError } from './InvalidFileStatusError'
import SignatureIcon from '../../ImageAssets/icon_DID.svg'
import { clearSign } from '../../Features/Signer/SignatureSlice'
import { CredentialContainer } from './CredentialContainer'

export const BottomSectionVerifyer = () => {
  const sign = useAppSelector(selectVerifiedSign)
  const did = useAppSelector(selectVerifiedDid)
  const w3name = useAppSelector(selectW3Name)
  const seviceEndpoints = useAppSelector(selectServiceEndpoints)
  const fileVerificationStatus = useAppSelector(fileStatus)
  const jwsStatus = useAppSelector(selectJwsSignStatus)
  const jws = useAppSelector(selectJwsSign)

  const verificationRef = useRef<null | HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const handleStartOver = () => {
    dispatch(clearEndpoint())
    dispatch(clearAll())
    dispatch(clearSign())
    dispatch(clearHash())
    dispatch(clearFileName())
    dispatch(clearFileStatuses())
    dispatch(clearHash())
    dispatch(clearJWS())
  }

  const renderSignCom = () => {
    if (jwsStatus === 'Not Checked' || jwsStatus === 'Validating') {
      return (
        <span className="absolute top-6 left-10 phone:left-2 font-['Overpass'] text-[#2a223180] text-[16px] leading-[17px] tracking-[0.11px]">
          {' '}
          Verification
        </span>
      )
    } else if (jwsStatus !== 'Verified') {
      return <JWSErrorsComponent />
    } else {
      return (
        <div className="flex flex-col w-[100%] mx-auto ml-3 mt-10 space-y-[40px] phone:w-[90%]">
          <div className="flex w-full items-center justify-start space-x-[10px] h-full">
            <p className=" text-light-green font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px] w-[82px]">
              Verification
            </p>
            <img src={OkIcon} />{' '}
          </div>
          <div className="max-w-full text-dark-purple flex flex-row w-[708px] flex-wrap space-x-[20px] phone:space-x-0 phone:space-y-[20px] phone:pt-4 ">
            <div className="flex space-x-1">
              <img src={SignatureIcon} />
              <p className=" font-['Overpass'] text-[16px] leading-[22px] tracking-[0.11px]">
                Signature
              </p>
            </div>

            <span className="phone:w-full overflow-wrap break-words w-4/5 h-[18px] font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
              {sign}
            </span>
          </div>
          <div className="max-w-full  flex w-[708px] space-x-[30px] flex-wrap phone:space-x-0 phone:space-y-[20px] phone:w-full phone:pt-20 small-device:pt-4  ">
            <p className=" font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px]">
              Signed By
            </p>
            <span className="phone:w-full overflow-wrap break-words h-[18px] w-4/5 font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
              {did}
            </span>
          </div>
          <div className="max-w-full  flex w-[708px] space-x-[40px] flex-wrap phone:space-x-0 phone:space-y-[20px] phone:w-full phone:pt-20 small-device:pt-4  ">
            <p className=" font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px]">
              W3name
            </p>
            <span className="phone:w-full overflow-wrap break-words h-[18px] w-4/5 font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
              {w3name}
            </span>
          </div>
          <div className="max-w-full flex w-[708px] flex-wrap space-x-[30px] pb-10 phone:pt-10 phone:space-x-0 phone:space-y-[20px]">
            <span className=" w-[74px] phone:w-[134px] text-right font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px] ">
              Service Endpoints
            </span>

            <div className="flex flex-col space-y-2 h-fit w-4/5 phone:w-full phone:overflow-y-scroll">
              {seviceEndpoints.map((endpoint) => (
                <CredentialContainer
                  url={endpoint.urls[0]}
                  endpointType={endpoint.types[0]}
                  key={endpoint.id}
                />
              ))}
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className=" bg-bottom-body w-screen relative small-device:pl-[15px] small-device:pr-[15px] ">
      <div
        ref={verificationRef}
        className={`bg-light-blue bg-opacity-80 border-solid relative border-[#517ca240] border-[1px] rounded-b-[15px] pl-[20px] min-h-[6rem] max-h-[fit] overscroll-y-auto  mx-auto max-w-[766px] mb-4 shadow-md`}
      >
        {jwsStatus === 'Validating' && (
          <img
            src={spinner}
            className=" absolute  top-6 right-[30px] h-[40px] w-[40px]"
          />
        )}
        {fileVerificationStatus.includes(false) && jws !== '' ? (
          <InvalidFileStatusError />
        ) : (
          renderSignCom()
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
