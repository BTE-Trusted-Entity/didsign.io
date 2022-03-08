import React, { useRef, useState } from 'react'
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
import {
  clearJWS,
  selectJwsSign,
  selectJwsSignStatus,
} from '../../Features/Signer/VerifyJwsSlice'
import spinner from '../../ImageAssets/puff.svg'
import loader from '../../ImageAssets/spinning-circles.svg'

import {
  getResolvedDid,
  validateCredential,
  validateRequest,
} from '../../Utils/verify-helper'
import { JWSErrorsComponent } from './JWSErrorsComponent'
import { DidDoc } from '../../Utils/types'
import { InvalidFileStatusError } from './InvalidFileStatusError'
import { Credential, RequestForAttestation, Did } from '@kiltprotocol/sdk-js'
import { DidDocument } from './DidDocument'
import ChevronDown from '../../ImageAssets/chevron_down_white.svg'
import ChevronUp from '../../ImageAssets/chevron_up_white.svg'
import SignatureIcon from '../../ImageAssets/icon_DID.svg'

export const BottomSectionVerifyer = () => {
  const sign = useAppSelector(selectVerifiedSign)
  const did = useAppSelector(selectVerifiedDid)
  const urls = useAppSelector(selectEndpointURL)
  const types = useAppSelector(selectEndpointTypes)
  const fileVerificationStatus = useAppSelector(fileStatus)
  const jwsStatus = useAppSelector(selectJwsSignStatus)
  const [clickIndices, setClickIndices] = useState<number[]>([])
  const [didDoc, setDidDoc] = useState<DidDoc[]>([])
  const resolvedDid = getResolvedDid(did)
  const [isCredentialValid, setIsCredentialValid] = useState<boolean>(true)
  const jws = useAppSelector(selectJwsSign)
  const [clickedIndex, setClickedIndex] = useState<number>(-1)

  const verificationRef = useRef<null | HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const handleFetch = (index: number) => {
    if (clickIndices.includes(index)) {
      setClickIndices(clickIndices.filter((item) => item !== index))
      setDidDoc(didDoc.filter((item) => item.index !== index))
      return
    } else {
      setClickIndices([...clickIndices, index])
    }
    if (didDoc.find((doc) => doc.index == index)) {
      return
    }
    setClickedIndex(index)

    const url = urls[index]
    fetch(url)
      .then((response) => response.json())
      .then(async (result) => {
        if (!Did.DidUtils.isSameSubject(result.claim.owner, did)) {
          setIsCredentialValid(false)
        } else if (Credential.isICredential(result)) {
          setIsCredentialValid(await validateCredential(result))
        } else if (RequestForAttestation.isIRequestForAttestation(result)) {
          setIsCredentialValid(await validateRequest(result))
        }
        const didObj: DidDoc = { contents: result.claim.contents, index: index }
        setDidDoc([...didDoc, didObj])
        setClickedIndex(-1)
      })
      .catch((error) => {
        console.log(error)
        setClickIndices(clickIndices.filter((item) => item !== index))
        setClickedIndex(-1)
      })
  }

  const handleStartOver = () => {
    dispatch(clearEndpoint())
    dispatch(clearAll())
    dispatch(clearHash())
    dispatch(clearFileName())
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
            <p className=" text-green-600 font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px] w-[82px]">
              Verification
            </p>
            <img src={OkIcon} />{' '}
          </div>
          <div className="max-w-full flex flex-row w-[708px] flex-wrap space-x-[20px] phone:space-x-0 phone:space-y-[20px] phone:pt-4 ">
            <div className="flex space-x-1">
              <img src={SignatureIcon} />
              <p className="text-[#2A2231] font-['Overpass'] text-[16px] leading-[22px] tracking-[0.11px]">
                Signature
              </p>
            </div>

            <span className="phone:w-full overflow-wrap break-words w-4/5 h-[18px] text-[#2A2231] font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
              {sign}
            </span>
          </div>
          <div className="max-w-full  flex w-[708px] space-x-[30px] flex-wrap phone:space-x-0 phone:space-y-[20px] phone:w-full phone:pt-20 small-device:pt-4  ">
            <p className="  text-[#2A2231] font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px]">
              Signed By
            </p>
            <span className="phone:w-full overflow-wrap break-words h-[18px] w-4/5 text-[#2A2231] font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
              {did}
            </span>
          </div>
          <div className="max-w-full flex w-[708px] flex-wrap space-x-[30px] pb-10 phone:pt-10 phone:space-x-0 phone:space-y-[20px]">
            <span className="text-[#2A2231] w-[74px] phone:w-[134px] text-right font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px] ">
              Service Endpoints
            </span>

            <div className="flex flex-col space-y-2 h-fit w-4/5 phone:w-full phone:overflow-y-scroll">
              {urls.map((url: string, index: number) => (
                <div key={index} className="flex flex-col h-fit space-y-1 ">
                  <div className="flex flex-wrap items-center justify-center">
                    <span className=" overflow-wrap break-words text-[#2A2231] font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
                      {types[index]}
                    </span>
                    <button
                      onClick={() => handleFetch(index)}
                      className="font-['Overpass'] flex justify-center relative items-center uppercase ml-auto text-[12px] leading-[13px]  tracking-[0.09px] text-white text-center w-[130px]  h-[22px] my-auto rounded-md 
     bg-[#3E6E99]"
                    >
                      {' '}
                      {clickedIndex === index && (
                        <img className={`absolute left-2 h-2/3`} src={loader} />
                      )}
                      <span>
                        {clickIndices.includes(index) ? 'Close' : 'Fetch'}
                      </span>
                      <img
                        className="absolute right-4 top-2"
                        src={
                          clickIndices.includes(index) ? ChevronUp : ChevronDown
                        }
                      />
                    </button>
                  </div>
                  <span className="overflow-wrap break-words text-[#2A2231] font-['Overpass'] text-[14px] leading-[16px] tracking-[0.1px]">
                    {url}
                  </span>
                  {clickIndices.includes(index) && (
                    <DidDocument
                      didDoc={didDoc}
                      resolvedDid={resolvedDid}
                      isCredentialValid={isCredentialValid}
                      index={index}
                    />
                  )}
                  <div className=" border-b-[1px] border-b-gray-900 border-dotted w-full"></div>
                </div>
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
        className={`bg-[#ddf0ff80] border-solid relative border-[#517ca240] border-[1px] rounded-b-[15px] pl-[20px] min-h-[6rem] max-h-[fit] overscroll-y-auto  mx-auto max-w-[766px] mb-4 shadow-md`}
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
