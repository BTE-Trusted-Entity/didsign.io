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

export const ImportFiles = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon)
  const fileHash = useAppSelector(selectHash)
  const jwsHash = useAppSelector(selectJwsHash)
  const jws = useAppSelector(selectJwsSign)
  const jwsStatus = useAppSelector(selectJwsSignStatus)
  const savedZippedFilenames = useAppSelector(selectFilename)
  const files = useAppSelector(selectFile)
  const dispatch = useAppDispatch()

  const handleZipCase = async (file: File) => {
    dispatch(updateSignStatus('Validating'))

    const sign = await newUnzip(file)
    if (sign === undefined) {
      dispatch(updateSignStatus('Invalid'))
      return
    }
    dispatch(updateSignStatus('Verified'))
    dispatch(update(sign.signatureWithEndpoint))
    dispatch(updateAllFilesStatus(sign.fileStatus))
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
    dispatch(addFile(file))

    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = async function () {
      if (file.name.split('.').pop() === 'didsign') {
        doc = JSON.parse(reader.result as string)
        const baseHash = await createHashFromHashArray(doc.hashes)
        const hashFromJWS: string = JSON.parse(atob(doc.jws.split('.')[1])).hash
        if (baseHash != hashFromJWS) {
          dispatch(updateSignStatus('Corrupted'))
        }
        dispatch(addJwsSign(doc.jws))
        dispatch(addJwsHashArray(doc.hashes))
        dispatch(updateIndividualFileStatus(true))

        dispatch(addHash('hash'))
      } else {
        const hash = await createHash(reader.result)
        dispatch(addHash(hash))
        dispatch(updateIndividualFileStatus(false))
      }
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
          if (
            savedZippedFilenames.find((file) => isDidSignFile(file)) !=
              undefined ||
            (didSignFile.length === 1 && acceptedFiles.length > 1)
          ) {
            dispatch(updateSignStatus('Multiple Sign'))
            return
          }

          if (didSignFile.length === 1) {
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
    [files]
  )
  useEffect(() => {
    if (jwsHash.length) {
      fileHash.filter(async (hash, index) => {
        if (jwsHash.includes(hash)) {
          dispatch(updateIndividualFileStatusOnIndex(index))
          if (jwsStatus === 'Not Checked') {
            if (index >= 1 && fileHash.length > 2) {
              return
            }
            dispatch(updateSignStatus('Validating'))
            const verifiedSignatureInstance = await getVerifiedData(jws)
            if (verifiedSignatureInstance != undefined) {
              dispatch(updateSignStatus('Verified'))
              dispatch(update(verifiedSignatureInstance))
            } else {
              dispatch(updateSignStatus('Invalid'))
            }
          } else {
            return
          }
        }
      })
    }
  }, [fileHash, files, jwsStatus, jws])
  return (
    <div className="mt-3 mx-auto h-[220px] relative max-w-[766px] flex justify-center">
      {jwsStatus === 'Multiple Sign' && <MultipleSignPopup />}
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
                Drag & Drop files
              </label>
            )}
            {impIcon === ImportIcon && (
              <label className="absolute top-14 pointer-events-none text-white text-center text-[14px] leading-[16px] tracking-[0.17px] font-['Overpass']">
                to verify here
              </label>
            )}
            <label className=" pointer-events-none text-white text-center text-[14px] leading-[16px] font-['Overpass'] tracking-[0.17px] absolute bottom-12">
              or click to browse your files
            </label>
          </div>
        )}
      </Dropzone>
    </div>
  )
}
