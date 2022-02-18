import Dropzone from 'react-dropzone'
import '../../Styles/App.css'
import React, { useCallback, useState } from 'react'
import ImportIcon from '../../ImageAssets/iconBIG_import_NEW.svg'
import ReleaseIcon from '../../ImageAssets/iconBIG_import_release.svg'
import { addFile, addFileName } from '../../Features/Signer/FileSlice'
import video from '../../ImageAssets/animation.mp4'
import fast from '../../ImageAssets/animation2.mp4'
import { useAppDispatch } from '../../app/hooks'
import JSZip from 'jszip'
import { newUnzip } from '../../Utils/verify-helper'
import { update } from '../../Features/Signer/EndpointSlice'

export function ImportFiles() {
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
        dispatch(addFile(file))
        if (file.type == 'application/zip') {
          const unzip = new JSZip()
          const unzipFile = await unzip.loadAsync(file)
          const filenames = Object.keys(unzipFile.files)
          if (filenames.includes('DIDsign.signature')) {
            dispatch(addFileName(Object.keys(unzipFile.files)))
            const sign = await newUnzip(file)
            if (sign === undefined) {
              console.log('error')
              return
            }
            dispatch(update(sign))
          }
        }
      })
    },
    [videoSource]
  )

  return (
    <div>
      <div className=" mt-10 mx-auto w-[48%] big-phone:w-[80%] h-52 relative 2xl:w-[48%] 2xl:h-80">
        <video
          id="video"
          className=" border-dashed border-1 object-cover rounded-t-lg bg-sky-900 border-sky-800 absolute h-full w-full top-0 bottom-0 left-0 right-0 "
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
            <div {...getRootProps({ className: 'h-full w-full absolute' })}>
              <input {...getInputProps()} />
              <div className="flex justify-center items-center w-full h-full">
                {videoSource === video && (
                  <label className="absolute top-6 font-normal drop-shadow-lg shadow-black pointer-events-none text-white text-center 2xl:text-xl text-md 3xl:text-xl lg:text-[18px] md:text-md sm:text-sm phone:text-xs font-[Overpass Regular]">
                    Drag & drop your files <br />
                    here to Verify
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
