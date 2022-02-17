import React from 'react'
import DelIcon from '../ImageAssets/icon_elete.svg'
import DocIcon from '../ImageAssets/doc_generic.svg'
import OkIcon from '../ImageAssets/icon_oK.svg'
import '../Styles/App.css'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectFilename } from '../Features/Signer/FileSlice'
import DIDIcon from '../ImageAssets/doc_signature.svg'

export function FileNameList() {
  const dispatch = useAppDispatch()
  const fileName = useAppSelector(selectFilename)

  if (fileName.length === 0) {
    return null
  }
  return (
    <div>
      {fileName.map((file: string, index: number) => (
        <div
          key={index}
          className=" pl-28 pr-4 flex flex-col space-y-1 w-[96%]"
        >
          <div className="flex items-center mt-2">
            {file == 'DIDsign.signature' ? (
              <img src={DIDIcon} />
            ) : (
              <img src={DocIcon} />
            )}
            <div className="mx-2 flex -space-y-1 flex-col">
              <span className={`text-left text-gray-900 text-md 3xl:text-lg `}>
                {file}
              </span>
            </div>
            <div className="flex space-x-2 ml-auto">
              <button>
                {' '}
                <img src={OkIcon} />{' '}
              </button>
            </div>
          </div>
          <div className=" border-b-[1px] border-b-gray-900 border-dotted w-full"></div>
        </div>
      ))}
    </div>
  )
}
