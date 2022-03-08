import React from 'react'
import DelIcon from '../ImageAssets/icon_elete.svg'
import DocIcon from '../ImageAssets/doc_generic.svg'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { deleteFile, selectFile } from '../Features/Signer/FileSlice'
import { deleteItem, selectHash } from '../Features/Signer/hashSlice'
import { clearSign } from '../Features/Signer/SignatureSlice'
import DIDIcon from '../ImageAssets/doc_signature_NEW.svg'
import ImageIcon from '../ImageAssets/doc_image.svg'
import info from '../ImageAssets/icon_info.svg'
import { isDidSignFile } from '../Utils/verify-helper'

export const FileList = () => {
  const dispatch = useAppDispatch()
  const files = useAppSelector(selectFile)
  const hash = useAppSelector(selectHash)

  const handleDelFile = (file: File) => {
    const index = files.indexOf(file)
    dispatch(deleteFile(file))
    dispatch(deleteItem(hash[index]))
    const didSignFile = files.find((file) => isDidSignFile(file.name))
    if (didSignFile !== undefined) {
      dispatch(deleteFile(didSignFile))
    }
    hash.length === 1 && dispatch(clearSign())
  }
  if (files.length === 0) {
    return null
  }
  return (
    <div className="h-auto">
      {files.map((file: File, index: number) => (
        <div
          key={index}
          className=" pl-28 pr-4 pt-2 flex flex-col space-y-1 w-[96%]"
        >
          <div className="flex items-center mt-2 ">
            {file.type.includes('image') ? (
              <img src={ImageIcon} />
            ) : file.name == 'signature.didsign' ? (
              <img src={DIDIcon} />
            ) : (
              <img src={DocIcon} />
            )}
            <div className="mx-2 flex -space-y-1 w-3/4">
              <span
                className={`font-['Overpass'] text-justified overflow-wrap break-words text-left text-[14px] leading-[16px] tracking-[0.1px] text-[#2A2231] ${
                  file.name == 'signature.didsign' && 'text-[#B20230] w-3/6 '
                }`}
              >
                {file.name}
              </span>
            </div>
            <div className="flex space-x-2 ml-auto w-1/2 justify-end">
              {file.name == 'signature.didsign' ? (
                <span className="text-left text-[#B20230] text-[14px] leading-[16px] tracking-[0.1px]  font-['Overpass']">
                  added by DID sign
                </span>
              ) : (
                <button onClick={() => handleDelFile(file)}>
                  {' '}
                  <img src={DelIcon} />{' '}
                </button>
              )}
            </div>
          </div>
          <div className=" border-b-[1px] border-b-gray-900 border-dotted w-full"></div>
        </div>
      ))}
    </div>
  )
}
