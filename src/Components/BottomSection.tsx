import React from 'react'
import { useAppSelector } from '../app/hooks'
import { SignBtn } from './SignBtn'
import { selectSign } from '../Features/Signer/SignatureSlice'
import { DownloadBtns } from './DownloadBtns'

export function BottomSectionSigner() {
  const sign = useAppSelector(selectSign)
  return (
    <div className=" bg-bottom-body w-screen relative overflow-x-hidden">
      <div className="flex-col items-center justify-center w-screen">
        {sign == '' ? <SignBtn /> : <DownloadBtns />}
      </div>
    </div>
  )
}
