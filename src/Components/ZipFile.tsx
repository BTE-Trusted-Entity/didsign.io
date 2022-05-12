import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearAll,
  clearFileName,
  selectFile,
  selectFilename,
} from '../Features/Signer/FileSlice'
import DelIcon from '../ImageAssets/icon_delete.svg'
import ZipIcon from '../ImageAssets/doc_zip_NEW.svg'
import {
  clearEndpoint,
  clearFileStatuses,
  fileStatus,
} from '../Features/Signer/EndpointSlice'
import { clearHash } from '../Features/Signer/hashSlice'
import {
  clearJWS,
  selectJwsSignStatus,
} from '../Features/Signer/VerifyJwsSlice'
import {
  CompressedFilesList,
  CompressedFilesWrapper,
  Container,
  FileName,
  FileOptionsSpan,
  FilesSeparator,
  FileWrapper,
  ZipContainer,
  ZipFileContainer,
  ZipFileSeparator,
} from '../StyledComponents/FilesList'
import { isDidSignFile } from '../Utils/verify-helper'
import DocIcon from '../ImageAssets/doc_generic.svg'
import OkIcon from '../ImageAssets/icon_oK.svg'
import DIDIcon from '../ImageAssets/doc_signature_NEW.svg'
import ImageIcon from '../ImageAssets/doc_image.svg'
import AttentionIcon from '../ImageAssets/icon_attention.svg'

const ZippedFilesList = () => {
  const zippedFiles = useAppSelector(selectFilename)
  const status = useAppSelector(fileStatus)

  return (
    <CompressedFilesList>
      {zippedFiles.map((file: string, index: number) => (
        <Container key={index}>
          <CompressedFilesWrapper>
            {file.includes('png') || file.includes('jpg') ? (
              <img src={ImageIcon} />
            ) : file.split('.').pop() === 'didsign' ? (
              <img src={DIDIcon} />
            ) : (
              <img src={DocIcon} />
            )}
            <FileName>{file}</FileName>
            <FileOptionsSpan>
              {isDidSignFile(file) || status[index] ? (
                <img src={OkIcon} />
              ) : (
                <img src={AttentionIcon} />
              )}
            </FileOptionsSpan>
          </CompressedFilesWrapper>
          <FilesSeparator></FilesSeparator>
        </Container>
      ))}
    </CompressedFilesList>
  )
}

export const ZipFile = () => {
  const fileNames = useAppSelector(selectFilename)
  const files = useAppSelector(selectFile)
  const jwsStatus = useAppSelector(selectJwsSignStatus)
  const dispatch = useAppDispatch()
  if (fileNames.length == 0) {
    return null
  }
  const handleDelete = () => {
    if (jwsStatus === 'Validating') {
      return
    }
    dispatch(clearEndpoint())
    dispatch(clearAll())
    dispatch(clearHash())
    dispatch(clearFileName())
    dispatch(clearHash())
    dispatch(clearJWS())
    dispatch(clearFileStatuses())
  }
  return (
    <ZipContainer>
      <ZipFileContainer>
        <FileWrapper>
          <img src={ZipIcon} />
          <FileName>{files[0].name}</FileName>
          <FileOptionsSpan>
            <button aria-label="delete file" onClick={handleDelete}>
              {' '}
              <img src={DelIcon} />{' '}
            </button>
          </FileOptionsSpan>
        </FileWrapper>
        <ZipFileSeparator></ZipFileSeparator>
        <ZippedFilesList />
      </ZipFileContainer>
    </ZipContainer>
  )
}
