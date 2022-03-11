import Dropzone from 'react-dropzone'
import React, { useCallback, useState } from 'react'
import ImportIcon from '../ImageAssets/iconBIG_import_NEW.svg'
import ReleaseIcon from '../ImageAssets/iconBIG_import_release.svg'
import {
  addBuffer,
  addFile,
  IBuffer,
  selectFile,
} from '../Features/Signer/FileSlice'
import { addHash } from '../Features/Signer/hashSlice'
import { createHash } from '../Utils/sign-helpers'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { FastAnimation, SlowAnimation } from './Animations'
import { isDidSignFile } from '../Utils/verify-helper'
import { SigningDuplicateFiles, SigningMultipleDidFiles } from './Popups'
import { showPopup } from '../Features/Signer/PopupSlice'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export const ImportFilesSigner = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon)
  const [signErrorPopup, setSignErrorPopup] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const files = useAppSelector(selectFile)
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false)
  const targetElement = document.querySelector('body')

  const handleDismiss = () => {
    dispatch(showPopup(false))
    setSignErrorPopup(false)
    if (targetElement != null) {
      enableBodyScroll(targetElement)
    }
  }
  const handleDuplicateDismiss = () => {
    dispatch(showPopup(false))
    setIsDuplicate(false)
    if (targetElement != null) {
      enableBodyScroll(targetElement)
    }
  }
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if ((acceptedFiles.filter((file) => files.includes(file)), length)) {
        dispatch(showPopup(true))
        setIsDuplicate(true)

        if (targetElement != null) {
          disableBodyScroll(targetElement)
        }
        return
      }
      acceptedFiles.forEach(async (file: File) => {
        setImportIcon(ImportIcon)
        if (
          files.filter((fileInFiles) => fileInFiles.name === file.name).length
        ) {
          dispatch(showPopup(true))
          setIsDuplicate(true)
          if (targetElement != null) {
            disableBodyScroll(targetElement)
          }
          return
        }

        if (isDidSignFile(file.name)) {
          dispatch(showPopup(true))
          setSignErrorPopup(true)
          if (targetElement != null) {
            disableBodyScroll(targetElement)
          }
          return
        }
        const buffer = await file.arrayBuffer()
        const bufferObj: IBuffer = {
          buffer: buffer,
          name: file.name,
        }
        dispatch(addBuffer(bufferObj))
        dispatch(addFile(file))
        const newHash = await createHash(buffer)
        dispatch(addHash(newHash))
      })
    },
    [files]
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
      {signErrorPopup && <SigningMultipleDidFiles dismiss={handleDismiss} />}
      {isDuplicate && (
        <SigningDuplicateFiles dismiss={handleDuplicateDismiss} />
      )}
    </div>
  )
}
