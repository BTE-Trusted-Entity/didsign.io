import Dropzone from 'react-dropzone'
import React, { useCallback, useState } from 'react'
import ImportIcon from '../ImageAssets/iconBIG_import_NEW.svg'
import ReleaseIcon from '../ImageAssets/iconBIG_import_release.svg'
import { addFile } from '../Features/Signer/FileSlice'
import { addHash } from '../Features/Signer/hashSlice'
import { createHash } from '../Utils/sign-helpers'
import { useAppDispatch } from '../app/hooks'
import { FastAnimation, SlowAnimation } from './Animations'

export const ImportFilesSigner = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon)

  const dispatch = useAppDispatch()

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(async (file: File) => {
        setImportIcon(ImportIcon)

        const reader = new FileReader()
        reader.onload = async function () {
          const newHash = await createHash(reader.result)
          dispatch(addHash(newHash))
        }
        reader.readAsText(file)
        dispatch(addFile(file))
      })
    },
    [ImportIcon]
  )

  return (
    <div
      id="dropzone"
      className=" mt-3 mx-auto h-[220px] relative max-w-[766px]  flex"
    >
      <Dropzone
        onDrop={handleDrop}
        onDragLeave={() => setImportIcon(ImportIcon)}
        onDragEnter={() => setImportIcon(ReleaseIcon)}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps({
              className:
                'h-full w-full absolute flex justify-center items-center',
            })}
          >
            {impIcon == ImportIcon ? <SlowAnimation /> : <FastAnimation />}

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
