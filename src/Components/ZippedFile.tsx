import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearAll,
  clearFileName,
  selectFile,
  selectFilename,
} from '../Features/Signer/FileSlice'
import DelIcon from '../ImageAssets/icon_elete.svg'
import ZipIcon from '../ImageAssets/doc_zip_NEW.svg'
import { clearEndpoint } from '../Features/Signer/EndpointSlice'
import { clearHash } from '../Features/Signer/hashSlice'

export function ZippedFile() {
  const fileName = useAppSelector(selectFilename)
  const files = useAppSelector(selectFile)
  const dispatch = useAppDispatch()
  if (fileName.length == 0) {
    return null
  }
  const handleDelete = () => {
    dispatch(clearFileName())
    dispatch(clearEndpoint())
    dispatch(clearHash())
    dispatch(clearAll())
  }
  return (
    <div className="flex flex-col space-y-1 w-[96%] pl-4 pr-4 pb-2">
      <div className="flex items-center mt-2 scrollbar-thumb-sky-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <div className="mx-2 flex space-x-1 ">
          <img src={ZipIcon} />
          <div className="mx-2 flex -space-y-1 flex-col">
            <span className="text-left text-gray-900text-md 3xl:text-lg font-['Overpass'] text-normal">
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
      <div className=" border-b-[1px] border-b-gray-900 border-dotted w-full"></div>
    </div>
  )
}
