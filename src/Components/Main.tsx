import React, { Fragment } from 'react'
import { ImportFilesSigner } from './ImportFilesSigner'
import { FilesSigner } from './FilesSigner'
import { useAppSelector } from '../app/hooks'
import { selectFiles } from '../Features/Signer/FileSlice'
import { FilesEmpty } from './FilesEmpty'
import CenterRightBubble from '../ImageAssets/CenterRightBubble.svg'
import CenterLeftBubble from '../ImageAssets/CenterLeftBubble.svg'
import { FilesVerifier } from './FilesVerifier'
import { ImportFilesVerifier } from './ImportFilesVerifier'
import { Routes, Route, Navigate } from 'react-router-dom'

import * as Styled from '../StyledComponents/Main'

const Signer = () => {
  const files = useAppSelector(selectFiles)

  return (
    <Fragment>
      <ImportFilesSigner />

      {files.length === 0 ? <FilesEmpty /> : <FilesSigner />}
    </Fragment>
  )
}

const Verifier = () => {
  const files = useAppSelector(selectFiles)

  return (
    <Fragment>
      <ImportFilesVerifier />

      {files.length === 0 ? <FilesEmpty /> : <FilesVerifier />}
    </Fragment>
  )
}

export const Main = () => {
  return (
    <Styled.Container>
      <Routes>
        <Route path="/" element={<Signer />} />
        <Route path="/verifier" element={<Verifier />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Styled.CenterLeftBubbleImage src={CenterLeftBubble} />
      <Styled.CenterRightBubbleImage src={CenterRightBubble} />
    </Styled.Container>
  )
}
