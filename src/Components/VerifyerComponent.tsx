import React from 'react'
import { ImportFiles } from './Verifyer/ImportFiles'
import { FileList } from './FileList'
import { selectFile, selectFilename } from '../Features/Signer/FileSlice'
import { useAppSelector } from '../app/hooks'
import { FileNameList } from './FileNameList'
import { ZippedFile } from './ZippedFile'

function VerifyerComponent() {
  const fileName = useAppSelector(selectFilename)
  const file = useAppSelector(selectFile)

  return (
    <div className="bg-mid-body w-screen overflow-y-hidden overflow-x-hidden relative">
      <ImportFiles />
      <div
        className={`scrollbar-thin scrollbar-thumb-sky-700 overflow-y-scroll relative flex-col -space-y-1 mx-auto w-[48%] min-h-[150px] 2xl:min-h-[200px] max-h-[900px]
             big-phone:w-[80%] bg-[#ddf0ff80] border-solid border-[#517ca240] border-t-[1px] border-l-[1px] border-r-[1px]`}
      >
        {file.length === 0 && (
          <span className="absolute top-2 left-8 text-[#2a223180] font-[Overpass Regular] text-[16px]">
            Files
          </span>
        )}
        <ZippedFile />
        {fileName.length > 0 ? <FileNameList /> : <FileList />}
      </div>
    </div>
  )
}
export default VerifyerComponent
