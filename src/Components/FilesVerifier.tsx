import React, { Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearAll,
  clearFileName,
  deleteFile,
  selectFile,
  selectFilename,
} from '../Features/Signer/FileSlice'

import {
  clearEndpoint,
  clearFileStatuses,
  deleteFilestatusOnIndex,
  fileStatus,
  replaceStatus,
} from '../Features/Signer/EndpointSlice'

import { clearHash, deleteHashFromIndex } from '../Features/Signer/hashSlice'
import {
  clearJWS,
  selectJwsSignStatus,
  updateSignStatus,
} from '../Features/Signer/VerifyJwsSlice'
import { isDidSignFile } from '../Utils/verify-helper'

import * as Styled from '../StyledComponents/FilesVerifier'

export const FilesVerifier = () => {
  const files = useAppSelector(selectFile)
  const unzippedFiles = useAppSelector(selectFilename)

  const jwsStatus = useAppSelector(selectJwsSignStatus)
  const status = useAppSelector(fileStatus)

  const dispatch = useAppDispatch()

  const handleDeleteAll = () => {
    if (jwsStatus === 'Validating') {
      return
    }

    dispatch(clearEndpoint())
    dispatch(clearAll())
    dispatch(clearHash())
    dispatch(clearFileName())
    dispatch(clearJWS())
    dispatch(clearFileStatuses())
  }

  const handleDeleteFile = (file: File) => {
    if (jwsStatus === 'Validating') return

    const index = files.indexOf(file)
    const didSignFileDeleted = isDidSignFile(files[index].name)
    if (didSignFileDeleted) {
      dispatch(replaceStatus())
      dispatch(clearJWS())
    }

    if (jwsStatus !== 'Corrupted') {
      dispatch(updateSignStatus('Not Checked'))
    }

    dispatch(clearEndpoint())
    dispatch(deleteFilestatusOnIndex(index))
    dispatch(deleteFile(file))
    dispatch(deleteHashFromIndex(index))
  }

  if (files.length === 0) {
    return null
  }

  const hasUnzippedFiles = unzippedFiles.length > 0

  return (
    <Fragment>
      {hasUnzippedFiles && (
        <Styled.ZipContainer>
          <Styled.ZipFileContainer>
            <Styled.ZipFile>{files[0].name}</Styled.ZipFile>

            <Styled.DeleteButton
              aria-label="Remove all files"
              onClick={handleDeleteAll}
            />
          </Styled.ZipFileContainer>

          <Styled.Heading>Files</Styled.Heading>

          <Styled.List>
            {unzippedFiles.map((name: string, index: number) => (
              <Styled.UnzippedFile key={index} statusOk={status[index]}>
                {isDidSignFile(name) ? (
                  <Styled.DidFile>{name}</Styled.DidFile>
                ) : name.includes('png') || name.includes('jpg') ? (
                  <Styled.ImageFile>{name}</Styled.ImageFile>
                ) : (
                  <Styled.DocFile>{name}</Styled.DocFile>
                )}
              </Styled.UnzippedFile>
            ))}
          </Styled.List>
        </Styled.ZipContainer>
      )}

      {!hasUnzippedFiles && (
        <Styled.Container>
          <Styled.Heading>Files</Styled.Heading>

          <Styled.List>
            {files.map((file: File, index: number) => (
              <Styled.File key={index} statusOk={status[index]}>
                {isDidSignFile(file.name) ? (
                  <Styled.DidFile>{file.name}</Styled.DidFile>
                ) : file.type.includes('image') ? (
                  <Styled.ImageFile>{file.name}</Styled.ImageFile>
                ) : (
                  <Styled.DocFile>{file.name}</Styled.DocFile>
                )}

                <Styled.DeleteButton
                  aria-label="Remove file"
                  onClick={() => handleDeleteFile(file)}
                />
              </Styled.File>
            ))}
          </Styled.List>
        </Styled.Container>
      )}
    </Fragment>
  )
}
