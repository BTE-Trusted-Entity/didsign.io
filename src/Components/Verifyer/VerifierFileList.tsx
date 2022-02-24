import React from 'react'
import DocIcon from '../../ImageAssets/doc_generic.svg'
import '../../Styles/App.css'
import { useAppSelector } from '../../app/hooks'
import { selectFile } from '../../Features/Signer/FileSlice'
import DIDIcon from '../../ImageAssets/doc_signature_NEW.svg'
import ImageIcon from '../../ImageAssets/doc_image.svg'
import { fileStatus } from '../../Features/Signer/EndpointSlice'
import AttentionIcon from '../../ImageAssets/icon_attention.svg'
import OkIcon from '../../ImageAssets/icon_oK.svg'

export function VerifierFileList() {
  const files = useAppSelector(selectFile)
  const status = useAppSelector(fileStatus)

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
                className={`font-['Overpass'] text-justified overflow-wrap break-words text-left text-gray-900text-md 2xl:text-xl ${
                  file.name == 'DIDsign.signature' && 'text-red-700 w-3/6 '
                }`}
              >
                {file.name}
              </span>
            </div>
            <div className="flex space-x-2 ml-auto w-1/2 justify-end">
              {status[index] && file.name != 'signature.didsign' && (
                <img src={OkIcon} />
              )}
              {!status[index] && <img src={AttentionIcon} />}
            </div>
          </div>
          <div className=" border-b-[1px] border-b-gray-900 border-dotted w-full"></div>
        </div>
      ))}
    </div>
  )
}
