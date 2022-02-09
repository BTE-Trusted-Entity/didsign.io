import React from 'react'
import DelIcon from '../SVGAssets/DelIcon'
import DocFileIcon from '../SVGAssets/DocFileIcon'
import OkIcon from '../SVGAssets/OkIcon'
import '../Styles/App.css'
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { deleteFile, selectFile } from "../Features/Signer/FileSlice"
import { deleteItem, selectHash } from "../Features/Signer/hashSlice"
import { clearSign, selectSign } from '../Features/Signer/SignatureSlice'
import DidFileIcon from '../SVGAssets/DidFileIcon'



function FileList() {
    const dispatch = useAppDispatch()
    const files = useAppSelector(selectFile)
    const hash = useAppSelector(selectHash)

    const handleDelFile = (file: File) => {
        const index = files.indexOf(file)
        dispatch(deleteFile(file))
        dispatch(deleteItem(hash[index]))
        hash.length === 1 && dispatch(clearSign())
    }
    if (files.length === 0) { return null }
    return <div className="bg-[#ddf0ff80] border-solid border-[#517ca240] border-2">
        {files.map((file: File, index: number) => <div key={index} className=" pl-28 pr-4 flex flex-col space-y-1 w-[96%]">
            <div className="flex items-center mt-2 scrollbar-thumb-sky-800">
                {file.name == "mydidsign.signature" ? <DidFileIcon /> : <DocFileIcon />}
                <div className="mx-2 flex -space-y-1 flex-col">
                    <span className="text-left text-gray-900text-md 3xl:text-lg">{file.name}</span>
                </div>
                <div className="flex space-x-2 ml-auto">
                    <button onClick={() => handleDelFile(file)}> <DelIcon /> </button>
                </div>

            </div>
            <div className="bg-slate-900 h-px w-full"></div>
        </div>)}

    </div>

}

export default FileList
