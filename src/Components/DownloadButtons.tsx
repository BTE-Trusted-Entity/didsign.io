import React, { useState } from 'react'
import { selectFinalHash, selectHash } from '../Features/Signer/hashSlice'
import { useAppSelector } from '../app/hooks'
import { selectDid, selectSign } from '../Features/Signer/SignatureSlice'
import { generateJWS } from '../Utils/sign-helpers'
import { Signature, SignDoc } from '../Utils/types'
import { saveAs } from 'file-saver'
import { IBuffer, selectBuffer } from '../Features/Signer/FileSlice'
import JSZip from 'jszip'

import * as Styled from '../StyledComponents/DownloadButtons'

export const DownloadButtons = () => {
  const sign = useAppSelector(selectSign)
  const did = useAppSelector(selectDid)
  const finalHash = useAppSelector(selectFinalHash)
  const hashes = useAppSelector(selectHash)
  const buffers = useAppSelector(selectBuffer)
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [progress, setProgress] = useState<string>('0')

  const signature: Signature = { keyID: did, signature: sign }

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
  return (
    <Styled.Container>
      <Styled.ZipButtonWrapper>
        <Styled.ZipText>now</Styled.ZipText>
        <Styled.ZipButton onClick={handleZip}>
          <span>{showLoader ? 'ZIPPING' : 'ZIP ALL FILES'}</span>
        </Styled.ZipButton>
      </Styled.ZipButtonWrapper>

      {showLoader && (
        <Styled.ProgressBarWrapper>
          <Styled.ProgressBar>
            <Styled.Progress style={{ width: progress + '%' }} />
          </Styled.ProgressBar>

          <Styled.ProgressInfo>{progress + '%'}</Styled.ProgressInfo>
        </Styled.ProgressBarWrapper>
      )}

      {!showLoader && (
        <Styled.DownloadSignButtonWrapper>
          <Styled.DownloadSignText>or only download</Styled.DownloadSignText>
          <Styled.DownloadSignButton onClick={handleDownloadSign}>
            <span>SIGNATURE</span>
          </Styled.DownloadSignButton>
        </Styled.DownloadSignButtonWrapper>
      )}
    </Styled.Container>
  )
}
