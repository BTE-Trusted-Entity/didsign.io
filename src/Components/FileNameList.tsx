import React from 'react'
import DocIcon from '../ImageAssets/doc_generic.svg'
import OkIcon from '../ImageAssets/icon_oK.svg'
import { useAppSelector } from '../app/hooks'
import { selectFilename } from '../Features/Signer/FileSlice'
import DIDIcon from '../ImageAssets/doc_signature_NEW.svg'
import ImageIcon from '../ImageAssets/doc_image.svg'
import { fileStatus } from '../Features/Signer/EndpointSlice'
import AttentionIcon from '../ImageAssets/icon_attention.svg'

export const FileNameList = () => {
  const fileName = useAppSelector(selectFilename)
  const status = useAppSelector(fileStatus)

  if (fileName.length === 0) {
    return null
  }
  return (
    <div>
      {fileName.map((file: string, index: number) => (
        <div
          key={index}
          className=" pl-20 pr-4 flex flex-col space-y-1 w-[96%]"
        >
          <div className="flex items-center mt-2">
            {file.includes('png') || file.includes('jpg') ? (
              <img src={ImageIcon} />
            ) : file.split('.').pop() === 'didsign' ? (
              <img src={DIDIcon} />
            ) : (
              <img src={DocIcon} />
            )}
            <div className="mx-2 flex -space-y-1 flex-col w-3/4">
              <span
                className={`font-['Overpass'] overflow-wrap break-words text-left text-gray-900 text-md 3xl:text-lg `}
              >
                {file}
              </span>
            </div>

            <div className="flex space-x-2 ml-auto">
              {file === 'signature.didsign' || status[index] ? (
                <img src={OkIcon} />
              ) : (
                <img src={AttentionIcon} />
              )}
            </div>
          </div>
          <div className=" border-b-[1px] border-b-gray-900 border-dotted w-full"></div>
        </div>
      ))}
    </div>
  )
}
