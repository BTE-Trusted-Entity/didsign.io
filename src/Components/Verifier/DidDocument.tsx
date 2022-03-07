import React from 'react'
import { DidDoc } from '../../Utils/types'
import AttentionIcon from '../../ImageAssets/icon_attention.svg'
import OkIcon from '../../ImageAssets/icon_oK.svg'

interface IDIDCredential {
  didDoc: DidDoc[]
  index: number
  resolvedDid: string
  isCredentialValid: boolean
}

export const DidDocument = (props: IDIDCredential) => {
  const doc = props.didDoc.filter((doc) => doc.index == props.index)[0]
  if (doc === undefined) {
    return null
  }
  return (
    <div className="flex flex-col pt-4 space-y-2 ">
      {Object.keys(doc?.contents).map((key, index) => (
        <div
          key={index}
          className={`max-w-full items-center justify-center phone:justify-start flex w-[708px] space-x-[30px] flex-wrap  phone:space-x-0 phone:space-y-[10px] phone:w-full   `}
        >
          <span className="text-[#2A2231] font-['Overpass'] w-[12%] text-[14px] leading-[13px] tracking-[0.11px]">
            {key}
          </span>
          <span className="phone:w-full items-center flex overflow-wrap break-words w-4/5 h-[18px] text-[#2A2231] font-['Overpass'] font-bold text-[12px] leading-[13px] tracking-[0.1px]">
            {doc?.contents[key]}
          </span>
        </div>
      ))}
      <div
        className={`max-w-full items-center justify-center phone:justify-start flex w-[708px] space-x-[30px] flex-wrap  phone:space-x-0 phone:space-y-[10px] phone:w-full phone:pt-5   `}
      >
        <span className="text-[#2A2231] w-[12%] font-['Overpass'] flex justify-start items-center text-[14px] leading-[13px] tracking-[0.11px]">
          Attester
        </span>

        <span className="phone:w-full flex flex-wrap overflow-wrap break-all w-4/5 h-[18px] text-[#2A2231] font-['Overpass'] font-bold text-[12px] leading-[13px] tracking-[0.1px]">
          {props.resolvedDid}
        </span>
      </div>
      <div
        className={`max-w-full flex items-center justify-center space-x-[30px] phone:pt-5`}
      >
        <span className="text-[#2A2231] font-['Overpass'] w-[12%] text-[14px] leading-[13px] tracking-[0.11px]">
          Valid
        </span>
        <div className="flex w-4/5 h-[18px] mb-2 phone:mb-0">
          {' '}
          <img src={props.isCredentialValid ? OkIcon : AttentionIcon} />
        </div>
      </div>
    </div>
  )
}
