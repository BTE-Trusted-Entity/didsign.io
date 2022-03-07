import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectFile } from '../../Features/Signer/FileSlice'
import { selectJwsSignStatus } from '../../Features/Signer/VerifyJwsSlice'
import AttentionIcon from '../../ImageAssets/icon_attention.svg'
import { isDidSignFile } from '../../Utils/verify-helper'

export const InvalidFileStatusError = () => {
  const files = useAppSelector(selectFile)
  const jwsStatus = useAppSelector(selectJwsSignStatus)

  return (
    <div className="flex flex-col w-[90%] mx-auto ml-3  mt-10 mb-20 space-y-[40px] phone:space-y-[20px]">
      <div className="flex w-full items-center justify-start space-x-[10px]">
        <p className=" text-[#F06543] font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px] w-[82px]">
          Verification
        </p>
        <img src={AttentionIcon} />{' '}
      </div>
      <div className="max-w-full flex w-[698px] flex-wrap space-x-[20px] phone:space-x-0 phone:space-y-[20px] phone:pt-4">
        <p className=" text-[#F06543] font-['Overpass'] text-[16px] leading-[22px] tracking-[0.11px">
          Attention
        </p>
        <span className="phone:w-full overflow-wrap break-words w-4/5 h-[18px] text-[#F06543] font-['Overpass'] font-bold text-[14px] leading-[22px] tracking-[0.1px]">
          The signature does not match with the imported files. Please make sure
          to import the correct files.
        </span>{' '}
      </div>
    </div>
  )
}
