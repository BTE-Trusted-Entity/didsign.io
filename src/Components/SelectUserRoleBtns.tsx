import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearEndpoint } from '../Features/Signer/EndpointSlice'
import { clearAll, clearFileName } from '../Features/Signer/FileSlice'
import { clearHash } from '../Features/Signer/hashSlice'
import { clearSign } from '../Features/Signer/SignatureSlice'
import { selectUserRole, updateRole } from '../Features/Signer/UserSlice'
import { clearJWS } from '../Features/Signer/VerifyJwsSlice'

export const SelectUserRoleBtns = () => {
  const userRoleIsSigner = useAppSelector(selectUserRole)

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
      ? dispatch(updateRole(true))
      : dispatch(updateRole(false))
  }
  return (
    <div className="bg-silver-blue">
      <div className="flex w-screen mx-auto h-[42px]">
        <button
          onClick={handleSigner}
          id="signer-btn"
          className={`flex flex-col  items-end small-device:items-start h-full w-1/2 justify-center ${
            !userRoleIsSigner && ' bg-selected-button'
          }`}
        >
          <span
            className={` h-full mr-10 flex flex-col  justify-center items-center w-[100%]  my-auto max-w-[383px] font-normal  text-[17px] leading-[16px]  tracking-[0.16px] uppercase font-['Overpass']   ${
              !userRoleIsSigner
                ? 'text-medium-blue text-opacity-80 text-[16px] leading-[17px] my-auto '
                : 'text-dark-purple'
            }`}
          >
            SIGN
            {userRoleIsSigner && (
              <div className="pt-[3px] w-[120px] max-w-[383px] border-b-black border-b-4"></div>
            )}
          </span>
        </button>
        <button
          onClick={handleSigner}
          id="verify-btn"
          className={`flex flex-col  items-start small-device:items-end h-full w-1/2 justify-start ${
            userRoleIsSigner && ' bg-selected-button'
          }`}
        >
          <span
            className={`h-full flex flex-col ml-10  justify-center items-center w-[100%]  my-auto max-w-[383px] font-normal  text-[17px] leading-[16px]  tracking-[0.16px] uppercase font-['Overpass']   ${
              userRoleIsSigner
                ? 'text-medium-blue text-opacity-80 text-[16px] leading-[17px] my-auto '
                : 'text-dark-purple'
            }`}
          >
            Verify
            {!userRoleIsSigner && (
              <div className="pt-[3px] justify-end  w-[120px] max-w-[383px] border-b-black border-b-4"></div>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}
