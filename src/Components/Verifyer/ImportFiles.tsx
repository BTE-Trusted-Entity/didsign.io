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
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file: File) => {
      ;(document.getElementById('video') as HTMLVideoElement).classList.remove(
        'invisible'
      )
      ;(document.getElementById('fast') as HTMLVideoElement).classList.add(
        'invisible'
      )
      setImportIcon(ImportIcon)
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
  }, [])

  return (
    <div>
      <div className=" mt-10 mx-auto w-[48%] big-phone:w-[80%] h-52 relative 2xl:h-80">
        <video
          id="fast"
          preload="auto"
          className="invisible border-dashed border-1 object-cover rounded-t-lg bg-sky-900 border-sky-800 absolute h-full w-full top-0 bottom-0 left-0 right-0 "
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
          className=" border-dashed border-1 object-cover rounded-t-lg bg-sky-900 border-sky-800 absolute h-full w-full top-0 bottom-0 left-0 right-0 "
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
                className: 'h-full w-full absolute',
              })}
            >
              <input {...getInputProps()} />
              <div className="flex justify-center items-center w-full h-full">
                {impIcon === ImportIcon && (
                  <label className="absolute top-6 font-normal drop-shadow-lg shadow-black pointer-events-none text-white text-center 2xl:text-xl text-md 3xl:text-xl lg:text-[18px] md:text-md sm:text-sm phone:text-xs font-[Overpass Regular]">
                    Drag & drop your files <br />
                    here to Verify
                  </label>
                )}
                <img src={impIcon} />
                {impIcon === ImportIcon && (
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
