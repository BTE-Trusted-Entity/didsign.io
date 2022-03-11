import Dropzone from 'react-dropzone'
import React, { useCallback, useState } from 'react'
import ImportIcon from '../ImageAssets/iconBIG_import_NEW.svg'
import ReleaseIcon from '../ImageAssets/iconBIG_import_release.svg'
import {
  addBuffer,
  addFile,
  deleteBuffer,
  deleteFile,
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
import { clearSign, selectSign } from '../Features/Signer/SignatureSlice'

export const ImportFilesSigner = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon)
  const [signErrorPopup, setSignErrorPopup] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const files = useAppSelector(selectFile)
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false)
  const targetElement = document.querySelector('body')
  const sign = useAppSelector(selectSign)

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
    async (acceptedFiles: File[]) => {
      if (sign !== '') {
        const didSignFile = files.filter((file) => isDidSignFile(file.name))
        const arrayBuffer = await didSignFile[0].arrayBuffer()
        const bufferObj: IBuffer = {
          buffer: arrayBuffer,
          name: didSignFile[0].name,
        }
        dispatch(deleteFile(didSignFile[0]))
        dispatch(deleteBuffer(bufferObj))
        dispatch(clearSign())
      }
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
                Sign Your Files
              </label>
            )}
            {impIcon === ImportIcon && (
              <label className="absolute top-14 pointer-events-none text-white text-center text-[14px] leading-[16px] tracking-[0.17px] font-['Overpass']">
                drag & drop
              </label>
            )}
            <label className=" pointer-events-none text-white text-center text-[14px] leading-[16px] font-['Overpass'] tracking-[0.17px] absolute bottom-12">
              or click / tap to browse your files
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
