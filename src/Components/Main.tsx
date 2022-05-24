import React, { Fragment } from 'react'
import { ImportFilesSigner } from './ImportFilesSigner'
import { FilesSigner } from './FilesSigner'
import { useAppSelector } from '../app/hooks'
import { selectFile } from '../Features/Signer/FileSlice'
import { FilesEmpty } from './FilesEmpty'
import CenterRightBubble from '../ImageAssets/CenterRightBubble.svg'
import CenterLeftBubble from '../ImageAssets/CenterLeftBubble.svg'
import { FilesVerifier } from './FilesVerifier'
import { selectUserRole } from '../Features/Signer/UserSlice'
import { ImportFilesVerifier } from './ImportFilesVerifier'

import * as Styled from '../StyledComponents/Main'

const Signer = () => {
  const files = useAppSelector(selectFile)

  return (
    <Fragment>
      <ImportFilesSigner />

      {files.length === 0 ? <FilesEmpty /> : <FilesSigner />}
    </Fragment>
  )
}

const Verifier = () => {
  const files = useAppSelector(selectFile)

  return (
    <Fragment>
      <ImportFilesVerifier />

      {files.length === 0 ? <FilesEmpty /> : <FilesVerifier />}
    </Fragment>
  )
}

export const Main = () => {
  const userRoleIsSigner = useAppSelector(selectUserRole)

  return (
    <Styled.Container>
      {userRoleIsSigner ? <Signer /> : <Verifier />}

      <Styled.CenterLeftBubbleImage src={CenterLeftBubble} />
      <Styled.CenterRightBubbleImage src={CenterRightBubble} />
    </Styled.Container>
  )
}
