import React from 'react'
import { useAppSelector } from '../app/hooks'
import { SignBtn } from './SignBtn'
import { selectSign } from '../Features/Signer/SignatureSlice'
import { DownloadBtns } from './DownloadBtns'

export const BottomSectionSigner = () => {
  const sign = useAppSelector(selectSign)
  return (
    <div className=" bg-bottom-body w-screen relative overflow-x-hidden">
      <div className="flex-col items-center justify-center w-screen small-device:pr-[15px] small-device:pl-[15px]">
        {sign == '' ? <SignBtn /> : <DownloadBtns />}
      </div>
    </div>
  )
}
