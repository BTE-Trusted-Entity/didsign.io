import Dropzone from 'react-dropzone'
import '../Styles/App.css'
import React, { useCallback, useState } from 'react'
import ImportIcon from '../ImageAssets/iconBIG_import_NEW.svg'
import ReleaseIcon from '../ImageAssets/iconBIG_import_release.svg'

import { addFile } from '../Features/Signer/FileSlice'
import { addHash } from '../Features/Signer/hashSlice'
import { createHash } from '../Utils/sign-helpers'
import video from '../ImageAssets/animation.mp4'
import fast from '../ImageAssets/animation2.mp4'
import { useAppDispatch } from '../app/hooks'

export function ImportFilesSigner() {
  const [videoSource, setVideoSource] = useState<string>(video)
  const [impIcon, setImportIcon] = useState<string>(ImportIcon)

  const dispatch = useAppDispatch()
  const handleDrag = useCallback(() => {
    ;(
      document.getElementById('video') as HTMLVideoElement
    ).defaultPlaybackRate = 3.0
    setVideoSource(fast)
    setImportIcon(ReleaseIcon)
  }, [])
  const handleLeave = useCallback(() => {
    ;(
      document.getElementById('video') as HTMLVideoElement
    ).defaultPlaybackRate = 1.0
    setVideoSource(video)
    setImportIcon(ImportIcon)
  }, [])
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(async (file: File) => {
        ;(
          document.getElementById('video') as HTMLVideoElement
        ).defaultPlaybackRate = 1.0
        setImportIcon(ImportIcon)
        setVideoSource(video)

        const reader = new FileReader()
        reader.onload = async function () {
          const newHash = await createHash(reader.result)
          dispatch(addHash(newHash))
        }
        reader.readAsText(file)
        dispatch(addFile(file))
      })
    },
    [videoSource]
  )

  return (
    <div>
      <div className=" mt-10 mx-auto w-[48%] big-phone:w-[80%] h-52 relative 2xl:h-80">
        <video
          id="video"
          className=" border-1 object-cover rounded-t-lg bg-sky-900 border-sky-800 absolute h-full w-full "
          src={videoSource}
          autoPlay
          loop
          muted
        >
          Your browser does not support the video tag.
        </video>
        <Dropzone
          onDrop={handleDrop}
          onDragLeave={handleLeave}
          onDragEnter={handleDrag}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'h-full w-full relative' })}>
              <input {...getInputProps()} />
              <div className="flex justify-center items-center w-full h-full">
                {videoSource === video && (
                  <label className="absolute top-6 font-normal drop-shadow-lg shadow-black pointer-events-none text-white text-center 2xl:text-xl text-md 3xl:text-xl lg:text-[18px] md:text-md sm:text-sm phone:text-xs font-[Overpass Regular]">
                    Drag & drop your files <br />
                    here to sign
                  </label>
                )}
                <img src={impIcon} />
                {videoSource === video && (
                  <label className="absolute bottom-8 font-normal drop-shadow-lg shadow-black pointer-events-none text-white text-center 2xl:text-xl text-md 3xl:text-xl lg:text-[18px] md:text-md sm:text-sm phone:text-xs font-[Overpass Regular]">
                    Or click to browse your files
                  </label>
                )}
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  )
}
