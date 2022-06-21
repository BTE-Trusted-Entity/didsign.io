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
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import * as Styled from '../StyledComponents/Main'
import { paths } from '../Utils/paths'
import { useRemoveData } from '../Hooks/useRemoveData'

const Signer = () => {
  const files = useAppSelector(selectFiles)
  const location = useLocation()
  const verifier = location.pathname === paths.verifier

  useRemoveData(verifier)

  return (
    <Fragment>
      <ImportFilesSigner />

      {files.length === 0 ? <FilesEmpty /> : <FilesSigner />}
    </Fragment>
  )
}

const Verifier = () => {
  const files = useAppSelector(selectFiles)
  const location = useLocation()
  const verifier = location.pathname === paths.verifier

  useRemoveData(verifier)

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
        <Route path={paths.signer} element={<Signer />} />
        <Route path={paths.verifier} element={<Verifier />} />
        <Route path="*" element={<Navigate to={paths.signer} replace />} />
      </Routes>
      <Styled.CenterLeftBubbleImage src={CenterLeftBubble} />
      <Styled.CenterRightBubbleImage src={CenterRightBubble} />
    </Styled.Container>
  )
}
