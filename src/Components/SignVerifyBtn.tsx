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
      <div className="flex w-screen mx-auto h-10">
        <div
          id="signer"
          className={`flex flex-col space-y-1 items-center justify-center h-full w-1/2 ${
            !userIsSigner && 'bg-selected-button'
          } `}
          onClick={handleSigner}
        >
          <button
            className={`h-10/12 w-1/2 bg-transparent font-normal text-[18px] uppercase big-phone:text-sm big-phone:h-1/2 3xl:text-2xl font-[Overpass Regular] ${
              !userIsSigner ? 'text-[#3e6e9980]' : 'text-[#2A2231]'
            } `}
          >
            SIGN
          </button>
          <div
            id="signer-line"
            className={`bg-[#2A2231] w-1/4 ${
              userIsSigner && 'h-[4px] rounded-md'
            } `}
          ></div>
        </div>
        <div
          id="verifyer"
          className={`flex flex-col space-y-1 items-center justify-center h-full w-1/2 ${
            userIsSigner && 'bg-selected-button'
          }`}
          onClick={handleSigner}
        >
          <button
            className={`h-10/12 w-1/2 bg-transparent font-normal text-[18px] uppercase big-phone:text-sm big-phone:h-1/2 3xl:text-2xl font-[Overpass Regular] ${
              userIsSigner ? 'text-[#3e6e9980]' : 'text-[#2A2231]'
            }`}
          >
            Verify
          </button>
          <div
            className={`bg-[#2A2231] w-1/4 ${!userIsSigner && 'h-[4px]'}`}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default SignVerifyBtn
