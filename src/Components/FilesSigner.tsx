import React, { Fragment, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../app/hooks'

import { deleteFile, selectFiles } from '../Features/Signer/FileSlice'
import { clearHash, deleteItem, selectHash } from '../Features/Signer/hashSlice'
import { clearSign } from '../Features/Signer/SignatureSlice'
import { showPopup } from '../Features/Signer/PopupSlice'

import { isDidSignFile } from '../Utils/verify-helper'

import { SignFileInfoPopup } from './Popups'
import { Timestamp } from './Timestamp'

import * as Styled from '../StyledComponents/FilesSigner'

export const FilesSigner = () => {
  const dispatch = useAppDispatch()
  const files = useAppSelector(selectFiles)
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
  const handleDeleteFile = (file: File) => {
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
    <Styled.Container>
      <Styled.Heading>Files</Styled.Heading>

      <Styled.List>
        {files.map((file: File, index: number) => (
          <li key={index}>
            {isDidSignFile(file.name) && (
              <Fragment>
                <Styled.File>
                  <Styled.DidSignFile>{file.name}</Styled.DidSignFile>

                  <Styled.DidSignInfo>
                    added by DIDsign
                    <Styled.InfoButton
                      aria-label="signature file information"
                      onClick={showSignInfoPopup}
                    />
                  </Styled.DidSignInfo>
                </Styled.File>

                <Timestamp />
              </Fragment>
            )}

            {!isDidSignFile(file.name) && (
              <Styled.File>
                {file.type.includes('image') ? (
                  <Styled.ImageFile>{file.name}</Styled.ImageFile>
                ) : (
                  <Styled.DocFile>{file.name}</Styled.DocFile>
                )}

                <Styled.DeleteButton
                  aria-label="delete file"
                  onClick={() => handleDeleteFile(file)}
                />
              </Styled.File>
            )}
          </li>
        ))}
      </Styled.List>

      {signPopup && <SignFileInfoPopup onDismiss={handleDismiss} />}
    </Styled.Container>
  )
}
