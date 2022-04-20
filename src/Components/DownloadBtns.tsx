import React, { useState } from 'react'
import {
  clearHash,
  selectFinalHash,
  selectHash,
} from '../Features/Signer/hashSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearSign,
  selectDid,
  selectSign,
} from '../Features/Signer/SignatureSlice'
import { generateJWS } from '../Utils/sign-helpers'
import { Signature, SignDoc } from '../Utils/types'
import { saveAs } from 'file-saver'
import {
  clearAll,
  clearFileName,
  IBuffer,
  selectBuffer,
} from '../Features/Signer/FileSlice'
import BtnStartOver from '../ImageAssets/button_start_over_NEW.svg'
import JSZip from 'jszip'
import {
  Container,
  DownloadSignBtn,
  DownloadSignBtnWrapper,
  DownloadSignTextSpan,
  ProgressBarWrapper,
  ProgressSpan,
  StyledProgress,
  StyledProgressBar,
  ZipBtn,
  ZipBtnWrapper,
  ZipTextSpan,
} from '../StyledComponents/DownloadBtns'

export const DownloadBtns = () => {
  const sign = useAppSelector(selectSign)
  const did = useAppSelector(selectDid)
  const finalHash = useAppSelector(selectFinalHash)
  const hashes = useAppSelector(selectHash)
  const buffers = useAppSelector(selectBuffer)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [progress, setProgress] = useState<string>('0')

  const signature: Signature = { keyID: did, signature: sign }

  const dispatch = useAppDispatch()
  const generateZipFile = async (buffers: IBuffer[]) => {
    const zip = new JSZip()
    buffers.map((buffer) => zip.file(buffer.name, buffer.buffer))
    const content = await zip.generateAsync(
      {
        type: 'blob',
        compression: 'STORE',
        streamFiles: true,
      },
      function updateCallback(metadata) {
        setProgress(metadata.percent.toFixed(0))
      }
    )
    saveAs(content, 'DIDsign-files.zip')
  }

  const handleDownloadSign = async () => {
    const jws = generateJWS(signature, await finalHash)
    const signedDoc: SignDoc = { hashes: hashes, jws: jws }
    const blob = new Blob([JSON.stringify(signedDoc)], {
      type: 'text/plain;charset=utf-8',
    })
    saveAs(blob, 'signature.didsign')
  }
  const handleZip = async () => {
    setShowLoader(true)
    document.body.style.pointerEvents = 'none'
    await generateZipFile(buffers)
    setShowLoader(false)
    document.body.style.pointerEvents = 'auto'
  }
  const handleStartOver = () => {
    dispatch(clearSign())
    dispatch(clearAll())
    dispatch(clearHash())
    dispatch(clearFileName())
  }

  return (
    <Container>
      <ZipBtnWrapper>
        <ZipTextSpan>now</ZipTextSpan>

        <ZipBtn onClick={handleZip}>
          <span>{showLoader ? 'ZIPPING' : 'ZIP ALL FILES'}</span>
        </ZipBtn>
      </ZipBtnWrapper>
      {showLoader && (
        <ProgressBarWrapper>
          <StyledProgressBar>
            <StyledProgress style={{ width: progress + '%' }}></StyledProgress>
          </StyledProgressBar>
          <ProgressSpan>{progress + '%'}</ProgressSpan>
        </ProgressBarWrapper>
      )}
      {!showLoader && (
        <DownloadSignBtnWrapper>
          <DownloadSignTextSpan>or only download</DownloadSignTextSpan>
          <DownloadSignBtn onClick={handleDownloadSign}>
            <span>SIGNATURE</span>
          </DownloadSignBtn>
        </DownloadSignBtnWrapper>
      )}
    </Container>
  )
}
