import Dropzone from 'react-dropzone'
import React, { useCallback, useEffect, useState } from 'react'
import ImportIcon from '../../ImageAssets/iconBIG_import_NEW.svg'
import ReleaseIcon from '../../ImageAssets/iconBIG_import_release.svg'
import {
  addFile,
  addFileName,
  selectFile,
  selectFilename,
} from '../../Features/Signer/FileSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  getFileNames,
  getVerifiedData,
  isDidSignFile,
  newUnzip,
} from '../../Utils/verify-helper'
import {
  clearEndpoint,
  fileStatus,
  update,
  updateAllFilesStatus,
  updateIndividualFileStatus,
  updateIndividualFileStatusOnIndex,
} from '../../Features/Signer/EndpointSlice'
import { createHash, createHashFromHashArray } from '../../Utils/sign-helpers'
import { SignDoc } from '../../Utils/types'
import {
  addJwsHashArray,
  addJwsSign,
  selectJwsHash,
  selectJwsSign,
  selectJwsSignStatus,
  updateSignStatus,
} from '../../Features/Signer/VerifyJwsSlice'
import { addHash, selectHash } from '../../Features/Signer/hashSlice'
import { SlowAnimation, FastAnimation } from '../Animations'
import { showPopup } from '../../Features/Signer/PopupSlice'
import { MultipleSignPopup } from '../Popups'
import { colors } from '../../StyledComponents/colors'
import {
  BrowseFilesText,
  Container,
  DragDropText,
  DropContainer,
  ImportImage,
  SignText,
} from '../../StyledComponents/SignImportComp'

export const ImportFilesVerifier = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon)
  const fileHash = useAppSelector(selectHash)
  const jwsHash = useAppSelector(selectJwsHash)
  const jws = useAppSelector(selectJwsSign)
  const jwsStatus = useAppSelector(selectJwsSignStatus)
  const savedZippedFilenames = useAppSelector(selectFilename)
  const files = useAppSelector(selectFile)
  const statuses = useAppSelector(fileStatus)

  const dispatch = useAppDispatch()

  const handleZipCase = async (file: File) => {
    dispatch(updateSignStatus('Validating'))

    const signatureStatus = await newUnzip(file)
    if (signatureStatus) {
      dispatch(updateSignStatus('Verified'))
      dispatch(update(signatureStatus.signatureWithEndpoint))
      dispatch(updateAllFilesStatus(signatureStatus.fileStatus))
    } else {
      dispatch(updateSignStatus('Invalid'))
    }
    return
  }

  const handleIndividualCase = async (file: File, acceptedFiles: File[]) => {
    let doc: SignDoc = { jws: '', hashes: [] }
    if (
      acceptedFiles.filter((file) => isDidSignFile(file.name)).length > 1 &&
      isDidSignFile(file.name)
    ) {
      dispatch(updateSignStatus('Multiple Sign'))
      dispatch(showPopup(true))
      return
    }

    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = async function () {
      if (typeof reader.result === 'string')
        throw new Error(
          'Verification: type of reader result should be arraybuffer'
        )

      if (isDidSignFile(file.name)) {
        const decoder = new TextDecoder('utf-8')
        const result = decoder.decode(reader.result as ArrayBuffer)
        doc = JSON.parse(result)
        const baseHash = await createHashFromHashArray(doc.hashes)
        const hashFromJWS: string = JSON.parse(atob(doc.jws.split('.')[1])).hash
        if (baseHash != hashFromJWS) {
          dispatch(updateSignStatus('Corrupted'))
        }
        dispatch(addJwsSign(doc.jws))
        dispatch(addJwsHashArray(doc.hashes))
        dispatch(updateIndividualFileStatus(true))
        dispatch(addHash(''))
      } else {
        const hash = await createHash(reader.result)
        dispatch(addHash(hash))
        dispatch(updateIndividualFileStatus(false))
      }
      dispatch(addFile(file))
    }
  }
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(async (file: File) => {
        setImportIcon(ImportIcon)
        if (files.length === 0) {
          dispatch(updateSignStatus('Not Checked'))
        }

        if (file.name.split('.').pop() === 'zip') {
          const filenames = await getFileNames(file)
          const didSignFile = filenames.filter((file: string) =>
            isDidSignFile(file)
          )
          if (didSignFile.length && acceptedFiles.length > 1) {
            return
          }
          if (
            savedZippedFilenames.filter((file) => isDidSignFile(file))
              .length === 1 &&
            didSignFile.length === 1
          ) {
            dispatch(showPopup(true))
            dispatch(updateSignStatus('Multiple Sign'))
            return
          }

          if (didSignFile.length === 1) {
            if (files.length > 0) {
              return
            }
            dispatch(addFile(file))
            dispatch(addFileName(filenames))
            await handleZipCase(file)
            return
          }
        }
        if (
          files.filter((file) => isDidSignFile(file.name)).length >= 1 &&
          file.name.split('.').pop() === 'didsign'
        ) {
          dispatch(showPopup(true))
          dispatch(updateSignStatus('Multiple Sign'))
          return
        }
        await handleIndividualCase(file, acceptedFiles)
      })
    },
    [files, savedZippedFilenames]
  )
  useEffect(() => {
    if (jwsHash.length) {
      fileHash.filter(async (hash, index) => {
        if (jwsHash.includes(hash)) {
          dispatch(updateIndividualFileStatusOnIndex(index))
        } else {
          if (hash !== '') {
            dispatch(updateSignStatus('Invalid'))
          }
          return
        }
      })
    }
  }, [fileHash, jwsStatus])

  const fetchEndpoints = async () => {
    dispatch(updateSignStatus('Validating'))
    const verifiedSignatureInstance = await getVerifiedData(jws)
    if (verifiedSignatureInstance) {
      dispatch(updateSignStatus('Verified'))
      dispatch(update(verifiedSignatureInstance))
    } else {
      dispatch(updateSignStatus('Invalid'))
    }
  }
  useEffect(() => {
    if (jwsStatus === 'Not Checked') {
      if (statuses.length > 1) {
        if (!statuses.includes(false)) {
          fetchEndpoints()
        } else {
          dispatch(clearEndpoint())
        }
      }
    }
  }, [statuses, jwsStatus])
  return (
    <Container>
      {jwsStatus === 'Multiple Sign' && <MultipleSignPopup />}
      <Dropzone
        onDrop={handleDrop}
        onDragLeave={() => setImportIcon(ImportIcon)}
        onDragEnter={() => setImportIcon(ReleaseIcon)}
      >
        {({ getRootProps, getInputProps }) => (
          <DropContainer {...getRootProps({})}>
            {impIcon == ImportIcon ? (
              <SlowAnimation color={colors.green} />
            ) : (
              <FastAnimation />
            )}

            <input {...getInputProps()} />
            <ImportImage src={impIcon} />
            {impIcon === ImportIcon && <SignText>Verify Your Files</SignText>}
            {impIcon === ImportIcon && <DragDropText>drag & drop</DragDropText>}
            <BrowseFilesText>
              or click / tap to browse your files
            </BrowseFilesText>
          </DropContainer>
        )}
      </Dropzone>
    </Container>
  )
}
