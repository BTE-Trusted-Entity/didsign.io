import React from 'react'
import DocIcon from '../ImageAssets/doc_generic.svg'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { deleteFile, selectFile } from '../Features/Signer/FileSlice'
import DIDIcon from '../ImageAssets/doc_signature_NEW.svg'
import ImageIcon from '../ImageAssets/doc_image.svg'
import {
  clearEndpoint,
  deleteFilestatusOnIndex,
  fileStatus,
  replaceStatus,
} from '../Features/Signer/EndpointSlice'
import AttentionIcon from '../ImageAssets/icon_attention.svg'
import OkIcon from '../ImageAssets/icon_oK.svg'
import DelIcon from '../ImageAssets/icon_delete.svg'
import { deleteHashFromIndex } from '../Features/Signer/hashSlice'
import {
  clearJWS,
  selectJwsSignStatus,
  updateSignStatus,
} from '../Features/Signer/VerifyJwsSlice'
import { isDidSignFile } from '../Utils/verify-helper'
import {
  Container,
  FileName,
  FileOptionsSpan,
  FilesSeparator,
  FileWrapper,
  StyledList,
} from '../StyledComponents/FilesList'

export const VerifierFileList = () => {
  const files = useAppSelector(selectFile)
  const status = useAppSelector(fileStatus)
  const jwsStatus = useAppSelector(selectJwsSignStatus)

  const dispatch = useAppDispatch()
  const handleDelFile = (file: File) => {
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
  return (
    <StyledList>
      {files.map((file: File, index: number) => (
        <Container key={index}>
          <FileWrapper className="flex items-center mt-2 ">
            {file.type.includes('image') ? (
              <img src={ImageIcon} />
            ) : isDidSignFile(file.name) ? (
              <img src={DIDIcon} />
            ) : (
              <img src={DocIcon} />
            )}
            <FileName>{file.name}</FileName>
            <FileOptionsSpan>
              {status[index] && !isDidSignFile(file.name) && (
                <img src={OkIcon} />
              )}
              {!status[index] && <img src={AttentionIcon} />}
              <button
                aria-label="delete file"
                onClick={() => handleDelFile(file)}
              >
                {' '}
                <img src={DelIcon} />{' '}
              </button>
            </FileOptionsSpan>
          </FileWrapper>
          <FilesSeparator></FilesSeparator>
        </Container>
      ))}
    </StyledList>
  )
}
