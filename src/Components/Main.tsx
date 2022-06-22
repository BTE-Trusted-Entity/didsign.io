import React, { Fragment, useEffect } from 'react'
import { ImportFilesSigner } from './ImportFilesSigner'
import { FilesSigner } from './FilesSigner'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearAll, selectFiles } from '../Features/Signer/FileSlice'
import { FilesEmpty } from './FilesEmpty'
import CenterRightBubble from '../ImageAssets/CenterRightBubble.svg'
import CenterLeftBubble from '../ImageAssets/CenterLeftBubble.svg'
import { FilesVerifier } from './FilesVerifier'
import { ImportFilesVerifier } from './ImportFilesVerifier'
import { Routes, Route, Navigate } from 'react-router-dom'

import * as Styled from '../StyledComponents/Main'
import { paths } from '../Utils/paths'
import { BottomSectionSigner, BottomSectionVerifier } from './BottomSection'
import { clearHash } from '../Features/Signer/hashSlice'
import { clearSign } from '../Features/Signer/SignatureSlice'
import {
  clearEndpoint,
  clearFileStatuses,
} from '../Features/Signer/EndpointSlice'
import { clearJWS } from '../Features/Signer/VerifyJwsSlice'

const Signer = () => {
  const files = useAppSelector(selectFiles)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(clearEndpoint())
    dispatch(clearJWS())
    dispatch(clearFileStatuses())
    dispatch(clearAll())
    dispatch(clearHash())
    dispatch(clearSign())
  }, [dispatch])

  return (
    <Fragment>
      <ImportFilesSigner />
      {files.length === 0 ? <FilesEmpty /> : <FilesSigner />}
      <BottomSectionSigner />
    </Fragment>
  )
}

const Verifier = () => {
  const files = useAppSelector(selectFiles)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(clearAll())
    dispatch(clearHash())
    dispatch(clearSign())
  }, [dispatch])

  return (
    <Fragment>
      <ImportFilesVerifier />

      {files.length === 0 ? <FilesEmpty /> : <FilesVerifier />}
      <BottomSectionVerifier />
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
