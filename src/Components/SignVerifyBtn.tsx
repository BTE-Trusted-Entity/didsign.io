import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearEndpoint } from '../Features/Signer/EndpointSlice'
import { clearAll, clearFileName } from '../Features/Signer/FileSlice'
import { clearHash } from '../Features/Signer/hashSlice'
import { clearSign } from '../Features/Signer/SignatureSlice'
import { selectUser, updateType } from '../Features/Signer/UserSlice'

function SignVerifyBtn() {
  const userIsSigner = useAppSelector(selectUser)

  const dispatch = useAppDispatch()
  const handleSigner = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch(clearSign())
    dispatch(clearAll())
    dispatch(clearHash())
    dispatch(clearFileName())
    dispatch(clearEndpoint())
    const id = (event.currentTarget as HTMLDivElement).id
    id == 'signer' ? dispatch(updateType(true)) : dispatch(updateType(false))
  }
  return (
    <div className="bg-mid-body">
      <div className="flex w-screen mx-auto h-[42px]">
        <div
          id="signer"
          className={`pt-[3px] flex flex-col items-end justify-center h-full space-y-[3px] w-1/2 ${
            !userIsSigner && 'bg-selected-button'
          } `}
          onClick={handleSigner}
        >
          <button
            className={` w-[333px]  text-left bg-transparent font-normal text-[18px] leading-[20px] tracking-[0.16px] uppercase font-['Overpass'] ${
              !userIsSigner
                ? 'text-[#3e6e9980] bg-selected-button text-[16px] leading-[17px]'
                : 'text-[#2A2231]'
            } `}
          >
            SIGN
          </button>
          <div className="w-[375px] flex justify-items-start">
            <div
              id="signer-line"
              className={`w-1/3 bg-[#2A2231] ${
                userIsSigner && 'h-[4px] rounded-md'
              } `}
            ></div>
          </div>
        </div>
        <div
          id="verifyer"
          className={`pt-[3px] flex flex-col items-start  justify-center h-full w-1/2 space-y-1 pb-[3px] ${
            userIsSigner && 'bg-selected-button'
          }`}
          onClick={handleSigner}
        >
          <button
            className={` w-[333px]  text-right  font-normal text-[17px] leading-[16px] tracking-[0.16px] uppercase font-['Overpass']] ${
              userIsSigner
                ? 'text-[#3e6e9980] text-[16px] leading-[17px]'
                : 'text-[#2A2231]'
            }`}
          >
            VERIFY
          </button>
          <div className="w-[363px] flex justify-end">
            <div
              className={`w-1/3 bg-[#2A2231] ${
                !userIsSigner && 'h-[4px] rounded-md'
              } `}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignVerifyBtn
