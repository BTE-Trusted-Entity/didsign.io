import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearEndpoint } from '../Features/Signer/EndpointSlice'
import { clearAll, clearFileName } from '../Features/Signer/FileSlice'
import { clearHash } from '../Features/Signer/hashSlice'
import { clearSign } from '../Features/Signer/SignatureSlice'
import { selectUser, updateType } from '../Features/Signer/UserSlice'
import { clearJWS } from '../Features/Signer/VerifyJwsSlice'

function SignVerifyBtn() {
  const userIsSigner = useAppSelector(selectUser)

  const dispatch = useAppDispatch()
  const handleSigner = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(clearSign())
    dispatch(clearAll())
    dispatch(clearHash())
    dispatch(clearFileName())
    dispatch(clearEndpoint())
    dispatch(clearJWS())
    const id = (event.currentTarget as HTMLButtonElement).id
    id == 'signer-btn'
      ? dispatch(updateType(true))
      : dispatch(updateType(false))
  }
  return (
    <div className="bg-mid-body">
      <div className="flex w-screen mx-auto h-[42px]">
        <button
          onClick={handleSigner}
          id="signer-btn"
          className={`flex flex-col  items-end h-full w-1/2 ${
            !userIsSigner && ' bg-selected-button'
          }`}
        >
          <span
            className={`pt-[3px] h-full mr-10 flex flex-col  justify-center items-center w-[100%]  my-auto max-w-[383px] font-normal  text-[17px] leading-[16px]  tracking-[0.16px] uppercase font-['Overpass']   ${
              !userIsSigner
                ? 'text-[#3e6e9980] text-[16px] leading-[17px] my-auto '
                : 'text-[#2A2231]'
            }`}
          >
            SIGN
            <div
              className={`${
                !userIsSigner && 'invisible'
              } pt-[3px] w-[120px] max-w-[383px] border-b-black border-b-4`}
            ></div>
          </span>
        </button>
        <button
          onClick={handleSigner}
          id="verify-btn"
          className={`flex flex-col  items-start h-full w-1/2 ${
            userIsSigner && ' bg-selected-button'
          }`}
        >
          <span
            className={`pt-[3px] h-full flex flex-col ml-10  justify-center items-center w-[100%]  my-auto max-w-[383px] font-normal  text-[17px] leading-[16px]  tracking-[0.16px] uppercase font-['Overpass']   ${
              userIsSigner
                ? 'text-[#3e6e9980] text-[16px] leading-[17px] my-auto '
                : 'text-[#2A2231]'
            }`}
          >
            Verify
            <div
              className={`${
                userIsSigner && 'invisible'
              } pt-[3px] w-[120px] max-w-[383px] border-b-black border-b-4`}
            ></div>
          </span>
        </button>
      </div>
    </div>
  )
}
export default SignVerifyBtn
