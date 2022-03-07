import React, { useEffect, useState } from 'react'
import DocIcon from '../../ImageAssets/doc_generic.svg'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  clearAll,
  deleteFile,
  selectFile,
} from '../../Features/Signer/FileSlice'
import DIDIcon from '../../ImageAssets/doc_signature_NEW.svg'
import ImageIcon from '../../ImageAssets/doc_image.svg'
import {
  clearEndpoint,
  deleteFilestatus,
  fileStatus,
  replaceStatus,
} from '../../Features/Signer/EndpointSlice'
import AttentionIcon from '../../ImageAssets/icon_attention.svg'
import OkIcon from '../../ImageAssets/icon_oK.svg'
import DelIcon from '../../ImageAssets/icon_elete.svg'
import { deleteItem, selectHash } from '../../Features/Signer/hashSlice'
import {
  clearJWS,
  updateSignStatus,
} from '../../Features/Signer/VerifyJwsSlice'
import { isDidSignFile } from '../../Utils/verify-helper'

export const VerifierFileList = () => {
  const files = useAppSelector(selectFile)
  const status = useAppSelector(fileStatus)
  const hash = useAppSelector(selectHash)
  const [didSignDeleted, setDidSignDeleted] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const handleDelFile = (file: File) => {
    const index = files.indexOf(file)
    const didSignFileDeleted = files[index].name.split('.').pop() == 'didsign'
    dispatch(deleteFile(file))
    dispatch(deleteItem(hash[index]))
    dispatch(deleteFilestatus(index))
    if (files.length === 1) {
      dispatch(clearJWS())
      dispatch(clearEndpoint())
      dispatch(clearAll())
    }
    if (didSignFileDeleted) {
      setDidSignDeleted(true)
    } else {
      dispatch(updateSignStatus('Not Checked'))
      dispatch(clearEndpoint())
    }
  }
  useEffect(() => {
    const didFiles = files.filter((file) => isDidSignFile(file.name))
    console.log(didFiles.length)
    if (didFiles.length === 0) {
      dispatch(replaceStatus())
      dispatch(clearJWS())
      dispatch(clearEndpoint())
    } else if (didFiles.length === 1) {
      dispatch(updateSignStatus('Not Checked'))
      dispatch(clearEndpoint())
    } else {
      dispatch(updateSignStatus('Multiple Sign'))
      dispatch(clearEndpoint())
    }

    setDidSignDeleted(false)
  }, [didSignDeleted])
  if (files.length === 0) {
    return null
  }
  return (
    <div>
      {files.map((file: File, index: number) => (
        <div
          key={index}
          className="  pl-28 phone:pl-16 pr-4 pt-2 flex flex-col space-y-1 w-[96%]"
        >
          <div className="flex items-center mt-2 ">
            {file.type.includes('image') ? (
              <img src={ImageIcon} />
            ) : file.name.split('.').pop() === 'didsign' ? (
              <img src={DIDIcon} />
            ) : (
              <img src={DocIcon} />
            )}
            <div className="mx-2 flex -space-y-1 w-3/4">
              <span
                className={`font-['Overpass'] text-justified overflow-wrap break-words w-full text-left text-[14px] leading-[16px] tracking-[0.1px] text-[#2A2231] ${
                  file.name.split('.').pop() === 'didsign' &&
                  'text-red-700 w-3/6 '
                }`}
              >
                {file.name}
              </span>
            </div>
            <div className="flex space-x-2 ml-auto w-1/2 justify-end">
              {status[index] && file.name.split('.').pop() !== 'didsign' && (
                <img src={OkIcon} />
              )}
              {!status[index] && <img src={AttentionIcon} />}
              <button onClick={() => handleDelFile(file)}>
                {' '}
                <img src={DelIcon} />{' '}
              </button>
            </div>
          </div>
          <div className=" border-b-[1px] border-b-gray-900 border-dotted w-full"></div>
        </div>
      ))}
    </div>
  )
}
