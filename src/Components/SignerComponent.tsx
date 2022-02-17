import '../Styles/App.css'
import React from 'react'
import { ImportFilesSigner } from './ImportFiles'
import { FileList } from './FileList'
function SignerComponent() {
  return (
    <div className="bg-mid-body w-screen overflow-y-hidden">
      <ImportFilesSigner />
      <div
        className={`scrollbar-thin scrollbar-thumb-sky-700 overflow-y-scroll relative flex-col -space-y-1 mx-auto w-[48%] min-h-[150px] 2xl:min-h-[200px] max-h-[900px]
             big-phone:w-2/3 bg-[#ddf0ff80] border-solid border-[#517ca240] border-2`}
      >
        <span className="absolute top-2 left-8 text-[#2a223180] font-[Overpass Regular] text-[16px]">
          Files
        </span>
        <FileList />
      </div>
    </div>
  )
}
export default SignerComponent
