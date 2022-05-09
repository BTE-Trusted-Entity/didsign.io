import React, { useState } from 'react'
import DelIcon from '../ImageAssets/icon_delete.svg'
import DocIcon from '../ImageAssets/doc_generic.svg'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { deleteFile, selectFile } from '../Features/Signer/FileSlice'
import { clearHash, deleteItem, selectHash } from '../Features/Signer/hashSlice'
import { clearSign } from '../Features/Signer/SignatureSlice'
import DIDIcon from '../ImageAssets/doc_signature_NEW.svg'
import ImageIcon from '../ImageAssets/doc_image.svg'
import info from '../ImageAssets/icon_info.svg'
import { isDidSignFile } from '../Utils/verify-helper'
import { SignFileInfoPopup } from './Popups'
import { showPopup } from '../Features/Signer/PopupSlice'
import {
  Container,
  DidSignFileSpan,
  FileName,
  FileOptionsSpan,
  FilesSeparator,
  FileWrapper,
  StyledList,
} from '../StyledComponents/FilesList'

export const FileList = () => {
  const dispatch = useAppDispatch()
  const files = useAppSelector(selectFile)
  const hash = useAppSelector(selectHash)
  const [signPopup, setSignPopup] = useState<boolean>(false)

  const showSignInfoPopup = () => {
    dispatch(showPopup(true))
    setSignPopup(true)
    document.body.style.overflowY = 'hidden'
  }
  const handleDismiss = () => {
    dispatch(showPopup(false))
    setSignPopup(false)
    document.body.style.overflowY = 'auto'
  }
  const handleDelFile = (file: File) => {
    const index = files.indexOf(file)
    dispatch(deleteFile(file))
    dispatch(deleteItem(hash[index]))
    dispatch(clearSign())
    const didSignFile = files.find((file) => isDidSignFile(file.name))
    if (didSignFile !== undefined) {
      dispatch(deleteFile(didSignFile))
      dispatch(deleteItem(hash[index - 1]))
    }
    hash.length === 1 && dispatch(clearSign())
    if (files.length === 1) {
      dispatch(clearHash())
    }
  }
  if (files.length === 0) {
    return null
  }
  return (
    <StyledList>
      {files.map((file: File, index: number) => (
        <Container key={index}>
          <FileWrapper>
            {file.type.includes('image') ? (
              <img src={ImageIcon} />
            ) : file.name == 'signature.didsign' ? (
              <img src={DIDIcon} />
            ) : (
              <img src={DocIcon} />
            )}
            <FileName>{file.name}</FileName>
            <FileOptionsSpan>
              {isDidSignFile(file.name) ? (
                <DidSignFileSpan>
                  added by DIDsign
                  <button
                    aria-label="signature file information"
                    onClick={showSignInfoPopup}
                  >
                    <img src={info} />
                  </button>
                </DidSignFileSpan>
              ) : (
                <button
                  aria-label="delete file"
                  onClick={() => handleDelFile(file)}
                >
                  {' '}
                  <img src={DelIcon} />{' '}
                </button>
              )}
            </FileOptionsSpan>
          </FileWrapper>
          <FilesSeparator></FilesSeparator>
        </Container>
      ))}
      {signPopup && <SignFileInfoPopup dismiss={handleDismiss} />}
    </StyledList>
  )
}
