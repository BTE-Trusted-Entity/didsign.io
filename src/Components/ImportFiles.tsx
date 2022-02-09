import Dropzone, { DropEvent, FileRejection } from "react-dropzone"
import "../Styles/App.css"
import React, { useCallback, useState } from "react"
import ImportIcon from "../SVGAssets/ImportIcon"
import { addFile } from "../Features/Signer/FileSlice"
import { addHash } from "../Features/Signer/hashSlice"
import { SignHelper } from "../Utils/sign-helpers"
import video from '../ImageAssets/animation.mp4'
import fast from '../ImageAssets/animation2.mp4'
import { useAppDispatch } from "../app/hooks"


function Files() {
    const [videoSource, setVideoSource] = useState<string>(video)
    const dispatch = useAppDispatch()
    const handleDrag = useCallback(() => {
        setVideoSource(fast)
    }, [])
    const handleLeave = useCallback(() => {
        setVideoSource(video)
    }, [])
    const handleDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach(async (file: File) => {
            dispatch(addFile(file))
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = async function () {
                const newHash = await SignHelper.createHash(reader.result as ArrayBuffer)
                dispatch(addHash(newHash))
                setVideoSource(video)
            }
        })
    }, [videoSource])

    return <div>
        <div className=" mt-10 mx-auto w-[60%] h-64 relative 2xl:w-[65%] 2xl:h-80">
            <video id="video" className=" border-dashed border-1 object-cover rounded-lg bg-sky-900 border-sky-800 absolute h-full w-full " src={videoSource} autoPlay loop muted>
                Your browser does not support the video tag.
            </video>
            <Dropzone onDrop={handleDrop} onDragLeave={handleLeave} onDragEnter={handleDrag}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "h-full w-full relative" })}>
                        <input {...getInputProps()} />
                        <div className="flex justify-center items-center w-full h-full">
                            <label className="absolute top-6 font-normal drop-shadow-lg shadow-black pointer-events-none text-white text-center 2xl:text-xl text-md 3xl:text-xl lg:text-[18px] md:text-md sm:text-sm phone:text-xs font-[Overpass Regular]">Drag & drop your files <br />here to sign</label>
                            <ImportIcon />
                            <label className="absolute bottom-8 font-normal drop-shadow-lg shadow-black pointer-events-none text-white text-center 2xl:text-xl text-md 3xl:text-xl lg:text-[18px] md:text-md sm:text-sm phone:text-xs font-[Overpass Regular]">Or click to browse your files</label>
                        </div>
                    </div>

                )}

            </Dropzone>
        </div>
    </div>
}

export default Files

