import React from 'react'
import DelIcon from '../ImageAssets/icon_elete.svg'
import DocIcon from '../ImageAssets/doc_generic.svg'
import '../Styles/App.css'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { deleteFile, selectFile } from '../Features/Signer/FileSlice'
import { deleteItem, selectHash } from '../Features/Signer/hashSlice'
import { clearSign } from '../Features/Signer/SignatureSlice'
import DIDIcon from '../ImageAssets/doc_signature_NEW.svg'
import ImageIcon from '../ImageAssets/doc_image.svg'

export function FileList() {
  const dispatch = useAppDispatch()
  const files = useAppSelector(selectFile)
  const hash = useAppSelector(selectHash)

  const handleDelFile = (file: File) => {
    const index = files.indexOf(file)
    dispatch(deleteFile(file))
    dispatch(deleteItem(hash[index]))
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
          className=" pl-28 pr-4 flex flex-col space-y-1 w-[96%]"
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
                className={`font-['Overpass'] text-justified overflow-wrap break-words text-left text-gray-900text-md 3xl:text-lg ${
                  file.name == 'DIDsign.signature' && 'text-red-700 w-3/6 '
                }`}
              >
                {file.name}
              </span>
            </div>
            <div className="flex space-x-2 ml-auto w-1/2 justify-end">
              {file.name == 'signature.didsign' ? (
                <span className="text-left text-red-700 text-md 3xl:text-lg font-['Overpass']">
                  created by DID sign
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
