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

export const ImportFilesSigner = () => {
  const [videoSource, setVideoSource] = useState<string>(video)
  const [impIcon, setImportIcon] = useState<string>(ImportIcon)

  const dispatch = useAppDispatch()
  const handleDrag = () => {
    ;(document.getElementById('fast') as HTMLVideoElement).playbackRate = 2.0
    ;(document.getElementById('fast') as HTMLVideoElement).classList.remove(
      'invisible'
    )
    ;(document.getElementById('video') as HTMLVideoElement).classList.add(
      'invisible'
    )

    setImportIcon(ReleaseIcon)
  }
  const handleLeave = () => {
    ;(document.getElementById('video') as HTMLVideoElement).classList.remove(
      'invisible'
    )
    ;(document.getElementById('fast') as HTMLVideoElement).classList.add(
      'invisible'
    )
    setImportIcon(ImportIcon)
  }
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(async (file: File) => {
        ;(
          document.getElementById('video') as HTMLVideoElement
        ).classList.remove('invisible')
        ;(document.getElementById('fast') as HTMLVideoElement).classList.add(
          'invisible'
        )
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
    <div
      id="dropzone"
      className=" mt-3 mx-auto h-[220px] relative max-w-[766px]  flex"
    >
      <video
        id="fast"
        preload="auto"
        className="invisible object-cover rounded-t-[15px] shadow-inner  absolute h-full w-full top-0 bottom-0 left-0 right-0 "
        src={fast}
        autoPlay
        loop
        muted
      >
        Your browser does not support the video tag.
      </video>
      <video
        id="video"
        preload="auto"
        className=" object-cover rounded-t-[15px] bg-sky-900 absolute h-full w-full top-0 bottom-0 left-0 right-0 "
        src={video}
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
          <div
            {...getRootProps({
              className:
                'h-full w-full absolute flex justify-center items-center',
            })}
          >
            <input {...getInputProps()} />
            <img className="absolute mx-auto my-auto" src={impIcon} />
            {impIcon === ImportIcon && (
              <label className="absolute top-8 pointer-events-none text-white text-center text-[16px] leading-[17px] tracking-[0.11px] font-['Overpass']">
                Drag & Drop
              </label>
            )}
            {impIcon === ImportIcon && (
              <label className="absolute top-14 pointer-events-none text-white text-center text-[14px] leading-[16px] tracking-[0.17px] font-['Overpass']">
                files to sign here
              </label>
            )}
            <label className=" pointer-events-none text-white text-center text-[14px] leading-[16px] font-['Overpass'] tracking-[0.17px] absolute bottom-12">
              or click to browse your files
            </label>
          </div>
        )}
      </Dropzone>
    </div>
  )
}
