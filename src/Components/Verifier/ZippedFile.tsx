import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  clearAll,
  clearFileName,
  selectFile,
  selectFilename,
} from '../../Features/Signer/FileSlice'
import DelIcon from '../../ImageAssets/icon_delete.svg'
import ZipIcon from '../../ImageAssets/doc_zip_NEW.svg'
import {
  clearEndpoint,
  clearFileStatuses,
} from '../../Features/Signer/EndpointSlice'
import { clearHash } from '../../Features/Signer/hashSlice'
import {
  clearJWS,
  selectJwsSignStatus,
} from '../../Features/Signer/VerifyJwsSlice'

export const ZippedFile = () => {
  const fileNames = useAppSelector(selectFilename)
  const files = useAppSelector(selectFile)
  const jwsStatus = useAppSelector(selectJwsSignStatus)
  const dispatch = useAppDispatch()
  if (fileNames.length == 0) {
    return null
  }
  const handleDelete = () => {
    if (jwsStatus === 'Validating') {
      return
    }
    dispatch(clearEndpoint())
    dispatch(clearAll())
    dispatch(clearHash())
    dispatch(clearFileName())
    dispatch(clearHash())
    dispatch(clearJWS())
    dispatch(clearFileStatuses())
  }
  return (
    <div className="flex flex-col space-y-1 w-[96%] pl-4 pr-4 pb-2">
      <div className="flex items-center mt-2 ">
        <img src={ZipIcon} />
        <div className="mx-2 flex space-x-1 ">
          <div className="mx-2 flex -space-y-1 flex-col">
            <span className="text-left text-[14px] leading-[16px] tracking-[0.1px] text-dark-purple  font-['Overpass']">
              {files[0].name}
            </span>
          </div>
        </div>
        <div className="flex space-x-2 ml-auto">
          <button onClick={handleDelete}>
            {' '}
            <img src={DelIcon} />{' '}
          </button>
        </div>
        <div className="flex space-x-2 mr-0"></div>
      </div>
      <div className=" border-b-[1px] border-b-dark-purple border-dotted w-full"></div>
    </div>
  )
}
