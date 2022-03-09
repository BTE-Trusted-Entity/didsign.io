import React from 'react'
import { ImportFiles } from './ImportFiles'
import { selectFile, selectFilename } from '../../Features/Signer/FileSlice'
import { useAppSelector } from '../../app/hooks'
import { ZippedFilesList } from './ZippedFilesList'
import { ZippedFile } from './ZippedFile'
import { VerifierFileList } from './VerifierFileList'
import CenterRightBubble from '../../ImageAssets/CenterRightBubble.svg'
import CenterLeftBubble from '../../ImageAssets/CenterLeftBubble.svg'
import { EmptyFilesList } from '../EmptyFilesList'

export const VerifierComponent = () => {
  const zippedFiles = useAppSelector(selectFilename)
  const files = useAppSelector(selectFile)

  return (
    <div className="bg-silver-blue w-screen overflow-y-hidden overflow-x-hidden relative bottom-0 small-device:pl-[15px] small-device:pr-[15px]">
      <ImportFiles />
      <div
        className={`overflow-y-auto relative flex-col -space-y-1 mx-auto max-w-[766px] min-h-[211px] max-h-[900px]
         bg-light-blue bg-opacity-80 border-solid border-[#517ca240]   border-t-[1px] border-l-[1px] border-r-[1px]`}
      >
        {files.length >= 0 && zippedFiles.length === 0 && (
          <span className="absolute top-4 left-10 phone:left-2 text-[#2a223180] font-['Overpass'] text-[16px] leading-[17px] tracking-[0.11px] w-[34px]">
            Files
          </span>
        )}
        <ZippedFile />
        {zippedFiles.length > 0 && <ZippedFilesList />}
        {zippedFiles.length === 0 && files.length > 0 && <VerifierFileList />}
        {files.length === 0 && <EmptyFilesList />}
      </div>
      <img
        src={CenterLeftBubble}
        className="absolute bottom-0 left-0 h-[105px] w-[343.5px]  pointer-events-none"
      />
      <img
        src={CenterRightBubble}
        className=" absolute bottom-0 right-0 h-[105px] w-[248px] pointer-events-none"
      />
    </div>
  )
}
