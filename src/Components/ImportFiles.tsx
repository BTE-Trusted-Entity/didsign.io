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
import {
  BrowseFilesText,
  Container,
  DragDropText,
  DropContainer,
  ImportImage,
  SignText,
} from '../StyledComponents/SignImportComp'
import { colors } from '../StyledComponents/colors'

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
    <Container>
      <Dropzone
        onDrop={handleDrop}
        onDragLeave={() => setImportIcon(ImportIcon)}
        onDragEnter={() => setImportIcon(ReleaseIcon)}
      >
        {({ getRootProps, getInputProps }) => (
          <DropContainer {...getRootProps({})}>
            {impIcon == ImportIcon ? (
              <SlowAnimation color={colors.pink} />
            ) : (
              <FastAnimation />
            )}

            <input {...getInputProps()} />
            <ImportImage src={impIcon} />
            {impIcon === ImportIcon && <SignText>Sign Your Files</SignText>}
            {impIcon === ImportIcon && <DragDropText>drag & drop</DragDropText>}
            <BrowseFilesText>
              or click / tap to browse your files
            </BrowseFilesText>
          </DropContainer>
        )}
      </Dropzone>
      {signErrorPopup && <SigningMultipleDidFiles dismiss={handleDismiss} />}
      {isDuplicate && (
        <SigningDuplicateFiles dismiss={handleDuplicateDismiss} />
      )}
    </Container>
  )
}
