import React from 'react'
import {
  clearHash,
  selectFinalHash,
  selectHash,
} from '../Features/Signer/hashSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearSign,
  selectDid,
  selectSign,
} from '../Features/Signer/SignatureSlice'
import { generateJWS, generateZipFile } from '../Utils/sign-helpers'
import { Signature, SignDoc } from '../Utils/types'
import { saveAs } from 'file-saver'
import {
  clearAll,
  clearFileName,
  selectFile,
} from '../Features/Signer/FileSlice'
import BtnStartOver from '../ImageAssets/button_start_over_NEW.svg'

export const DownloadBtns = () => {
  const sign = useAppSelector(selectSign)
  const did = useAppSelector(selectDid)
  const finalHash = useAppSelector(selectFinalHash)
  const hashes = useAppSelector(selectHash)
  const files = useAppSelector(selectFile)
  const signature: Signature = { keyID: did, signature: sign }

  const dispatch = useAppDispatch()

  const handleDownloadSign = async () => {
    const jws = generateJWS(signature, await finalHash)
    const signedDoc: SignDoc = { hashes: hashes, jws: jws }
    const blob = new Blob([JSON.stringify(signedDoc)], {
      type: 'text/plain;charset=utf-8',
    })
    saveAs(blob, 'signature.didsign')
  }
  const handleZip = async () => {
    await generateZipFile(files)
  }
  const handleStartOver = () => {
    dispatch(clearSign())
    dispatch(clearAll())
    dispatch(clearHash())
    dispatch(clearFileName())
    ;(
      document.getElementById('sign-component') as HTMLDivElement
    ).style.pointerEvents = 'auto'
  }
  return (
    <div className="bg-light-blue bg-opacity-80 border-solid border-[#517ca240] border-[1px] mx-auto flex flex-col items-center justify-center rounded-b-[15px] max-w-[766px] pt-4 pr-4 shadow-sm mb-8 space-y-4 relative">
      <div className="flex space-x-8 justify-center items-center ">
        <span className="w-[110px] text-right text-[14px] font-['Overpass' absolute left-[180px] phone:invisible text-dark-purple">
          now
        </span>
        <button
          className="w-[160px] h-[30px] text-[14px] leading-[16px] tracking-[0.1px]  font-['Overpass'] bg-medium-blue text-white rounded-[8px]"
          onClick={handleZip}
        >
          ZIP ALL FILES
        </button>
      </div>
      <div className="flex space-x-8 justify-start items-center pb-4">
        <span className="text-[14px] leading-[16px] tracking-[0.1px] w-[110px] font-['Overpass'] text-right absolute left-[185px] phone:invisible text-dark-purple">
          or only download
        </span>
        <button
          className="w-[130px] h-[22px]  font-[Overpass Regular] bg-medium-blue text-white text-[12px] leading-[13px] tracking-[0.09px] rounded-[6px]"
          onClick={handleDownloadSign}
        >
          SIGNATURE
        </button>
      </div>
      <button className="absolute -right-1 -bottom-1" onClick={handleStartOver}>
        <img className="h-12 w-12" src={BtnStartOver} />
      </button>
    </div>
  )
}
