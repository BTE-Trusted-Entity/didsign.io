import Dropzone from 'react-dropzone'
import '../../Styles/App.css'
import React, { useCallback, useEffect, useState } from 'react'
import ImportIcon from '../../ImageAssets/iconBIG_import_NEW.svg'
import ReleaseIcon from '../../ImageAssets/iconBIG_import_release.svg'
import {
  addFile,
  addFileName,
  selectFilename,
} from '../../Features/Signer/FileSlice'
import video from '../../ImageAssets/animation.mp4'
import fast from '../../ImageAssets/animation2.mp4'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  getFileNames,
  getVerifiedData,
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
  updateSignStatus,
} from '../../Features/Signer/VerifyJwsSlice'
import { addHash, selectHash } from '../../Features/Signer/hashSlice'

export const ImportFiles = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon)
  const fileHash = useAppSelector(selectHash)
  const jwsHash = useAppSelector(selectJwsHash)
  const jws = useAppSelector(selectJwsSign)
  const savedFiles = useAppSelector(selectFilename)

  const dispatch = useAppDispatch()
  const handleDrag = () => {
    ;(document.getElementById('fast') as HTMLVideoElement).playbackRate = 2.0
    ;(document.getElementById('fast') as HTMLVideoElement).classList.remove(
      'invisible'
    )
    ;(document.getElementById('video') as HTMLVideoElement).classList.add(
      'invisible'
    )

    setImportIcon(ReleaseIcon)
  }
  const handleLeave = () => {
    ;(document.getElementById('video') as HTMLVideoElement).classList.remove(
      'invisible'
    )
    ;(document.getElementById('fast') as HTMLVideoElement).classList.add(
      'invisible'
    )
    setImportIcon(ImportIcon)
  }
  const handleZipCase = async (file: File) => {
    ;(document.getElementById('dropzone') as HTMLDivElement).draggable = false

    const sign = await newUnzip(file)
    if (sign === undefined) {
      console.log('error')
      return
    }
    dispatch(update(sign.signatureWithEndpoint))
    dispatch(updateAllFilesStatus(sign.fileStatus))
  }
  const handleIndividualCase = async (file: File) => {
    let doc: SignDoc = { jws: '', hashes: [] }
    dispatch(addFile(file))
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = async function () {
      if (file.name.split('.').pop() === 'didsign') {
        doc = JSON.parse(reader.result as string)
        const baseHash = await createHashFromHashArray(doc.hashes)
        const hashFromJWS: string = JSON.parse(atob(doc.jws.split('.')[1])).hash
        if (baseHash != hashFromJWS) {
          dispatch(updateSignStatus(false))
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
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    if (
      acceptedFiles.filter((file) =>
        file.name.match(/\.[0-9a-z]+$/i)?.includes('.didsign')
      ).length > 1
    ) {
      return
    }
    acceptedFiles.forEach(async (file: File) => {
      ;(document.getElementById('video') as HTMLVideoElement).classList.remove(
        'invisible'
      )
      ;(document.getElementById('fast') as HTMLVideoElement).classList.add(
        'invisible'
      )
      setImportIcon(ImportIcon)
      if (file.name.split('.').pop() === 'didsign' && jwsHash.length > 0) {
        return
      }

      if (file.name.split('.').pop() === 'zip') {
        const filenames = await getFileNames(file)
        const didSignFile = filenames.filter((file: string) =>
          file.match(/\.[0-9a-z]+$/i)?.includes('.didsign')
        )
        if (
          savedFiles.find((file) => file.split('.').pop() === 'didsign') !=
            undefined ||
          (didSignFile.length === 1 && acceptedFiles.length > 1)
        ) {
          return
        }

        if (didSignFile.length === 1) {
          dispatch(addFile(file))
          dispatch(addFileName(filenames))
          await handleZipCase(file)
          return
        }
      }
      await handleIndividualCase(file)
    })
  }, [])
  useEffect(() => {
    if (jwsHash.length > 0) {
      fileHash.filter(async (hash, index) => {
        if (jwsHash.includes(hash)) {
          dispatch(updateIndividualFileStatusOnIndex(index))
          if (jws != 'Verified') {
            if (index >= 1 && fileHash.length > 2) {
              return
            }
            const verifiedSignatureInstance = await getVerifiedData(jws)
            if (verifiedSignatureInstance != undefined) {
              dispatch(update(verifiedSignatureInstance))
              dispatch(addJwsSign('Verified'))
            } else {
              dispatch(updateSignStatus(false))
            }
          } else {
            return
          }
        }
      })
    }
  }, [fileHash])
  return (
    <div
      id="dropzone"
      className=" mt-3 mx-auto h-[220px] relative max-w-[766px]  flex"
    >
      <video
        id="fast"
        preload="auto"
        className="invisible object-cover rounded-t-[15px] shadow-inner  absolute h-full w-full top-0 bottom-0 left-0 right-0 "
        src={fast}
        autoPlay
        loop
        muted
      >
        Your browser does not support the video tag.
      </video>
      <video
        id="video"
        preload="auto"
        className=" object-cover rounded-t-[15px] bg-sky-900 absolute h-full w-full top-0 bottom-0 left-0 right-0 "
        src={video}
        autoPlay
        loop
        muted
      >
        Your browser does not support the video tag.
      </video>
      <Dropzone
        onDrop={handleDrop}
        onDragLeave={handleLeave}
        onDragEnter={handleDrag}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps({
              className:
                'h-full w-full absolute flex justify-center items-center',
            })}
          >
            <input {...getInputProps()} />
            <img className="absolute mx-auto my-auto" src={impIcon} />
            {impIcon === ImportIcon && (
              <label className="absolute top-8 pointer-events-none text-white text-center text-[16px] leading-[17px] tracking-[0.11px] font-['Overpass']">
                Drag & Drop
              </label>
            )}
            {impIcon === ImportIcon && (
              <label className="absolute top-14 pointer-events-none text-white text-center text-[14px] leading-[16px] tracking-[0.17px] font-['Overpass']">
                your files here to Verify
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
