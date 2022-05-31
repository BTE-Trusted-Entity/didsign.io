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
import { SigningMultipleDidFiles } from './Popups'
import { showPopup } from '../Features/Signer/PopupSlice'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { clearSign, selectSign } from '../Features/Signer/SignatureSlice'
import { colors } from '../StyledComponents/colors'

import * as Styled from '../StyledComponents/ImportFilesSigner'

export const ImportFilesSigner = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon)
  const [signErrorPopup, setSignErrorPopup] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const files = useAppSelector(selectFile)
  const targetElement = document.querySelector('body')
  const sign = useAppSelector(selectSign)

  const handleDismiss = () => {
    dispatch(showPopup(false))
    setSignErrorPopup(false)
    if (targetElement != null) {
      enableBodyScroll(targetElement)
    }
  }
  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (sign) {
        const didSignFile = files.find((file) => isDidSignFile(file.name))
        if (!didSignFile) return
        const arrayBuffer = await didSignFile.arrayBuffer()
        const bufferObj: IBuffer = {
          buffer: arrayBuffer,
          name: didSignFile.name,
        }
        dispatch(deleteFile(didSignFile))
        dispatch(deleteBuffer(bufferObj))
        dispatch(clearSign())
      }
      acceptedFiles.forEach(async (file: File) => {
        setImportIcon(ImportIcon)

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
          buffer,
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
    <Styled.Container>
      <Dropzone
        onDrop={handleDrop}
        onDragLeave={() => setImportIcon(ImportIcon)}
        onDragEnter={() => setImportIcon(ReleaseIcon)}
      >
        {({ getRootProps, getInputProps }) => (
          <Styled.DropContainer {...getRootProps({})}>
            {impIcon == ImportIcon ? (
              <SlowAnimation color={colors.pink} />
            ) : (
              <FastAnimation />
            )}

            <input {...getInputProps()} />
            <Styled.ImportImage src={impIcon} />
            {impIcon === ImportIcon && (
              <Styled.SignText>Sign Your Files</Styled.SignText>
            )}
            {impIcon === ImportIcon && (
              <Styled.DragDropText>drag & drop</Styled.DragDropText>
            )}
            {impIcon === ImportIcon && (
              <Styled.BrowseFilesText>
                or click / tap to browse your files
              </Styled.BrowseFilesText>
            )}
          </Styled.DropContainer>
        )}
      </Dropzone>

      {signErrorPopup && <SigningMultipleDidFiles dismiss={handleDismiss} />}
    </Styled.Container>
  )
}
