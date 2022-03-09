import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { fileStatus } from '../../Features/Signer/EndpointSlice'
import { selectJwsSignStatus } from '../../Features/Signer/VerifyJwsSlice'
import AttentionIcon from '../../ImageAssets/icon_attention.svg'

export const JWSErrorsComponent = () => {
  const jwsStatus = useAppSelector(selectJwsSignStatus)
  const fileVerificationStatus = useAppSelector(fileStatus)
  if (jwsStatus === 'Multiple Sign') {
    return null
  }

  const showErrorMessages = () => {
    if (jwsStatus === 'Invalid') {
      return (
        <span className="phone:w-full overflow-wrap break-words w-4/5 h-[18px]  font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
          The signature does not match with the imported files. Please make sure
          to import the correct files.
        </span>
      )
    } else if (fileVerificationStatus.includes(false)) {
      return (
        <span className="phone:w-full overflow-wrap break-words w-4/5 h-[18px]  font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
          The signature does not match with the imported files. Please make sure
          to import the correct files.
        </span>
      )
    } else if (jwsStatus === 'Corrupted') {
      return (
        <span className="phone:w-full overflow-wrap break-words w-4/5 h-[18px] font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
          The signature file is corrupted. Please make sure to import the
          correct signature file.
        </span>
      )
    }
  }

  return (
    <div className="flex flex-col w-[90%] mx-auto ml-3 text-attention-orange  mt-10 mb-20 space-y-[40px] phone:space-y-[20px]">
      <div className="flex w-full items-center justify-start space-x-[10px]">
        <p className="  font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px] w-[82px]">
          Verification
        </p>
        <img src={AttentionIcon} />{' '}
      </div>
      <div className="max-w-full flex w-[698px] flex-wrap space-x-[20px] phone:space-x-0 phone:space-y-[20px] phone:pt-4">
        <p className="font-['Overpass'] text-[16px] leading-[22px] tracking-[0.11px">
          Attention
        </p>

        {showErrorMessages()}
      </div>
    </div>
  )
}
