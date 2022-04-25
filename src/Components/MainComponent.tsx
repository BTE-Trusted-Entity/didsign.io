import React from 'react'
import { ImportFilesSigner } from './ImportFilesSigner'
import { FileList } from './FileList'
import { useAppSelector } from '../app/hooks'
import { selectFile, selectFilename } from '../Features/Signer/FileSlice'
import { EmptyFilesList } from './EmptyFilesList'
import CenterRightBubble from '../ImageAssets/CenterRightBubble.svg'
import CenterLeftBubble from '../ImageAssets/CenterLeftBubble.svg'
import { Container, FileSpanZip } from '../StyledComponents/MainComponent'
import {
  CenterLeftBubbleImage,
  CenterRightBubbleImage,
  FilesContainer,
  FileSpan,
} from '../StyledComponents/MainComponent'
import { ZipFile } from './ZipFile'
import { VerifierFileList } from './VerifierFileList'
import { selectUserRole } from '../Features/Signer/UserSlice'
import { ImportFilesVerifier } from './ImportFilesVerifier'

export const MainComponent = () => {
  const userRoleIsSigner = useAppSelector(selectUserRole)

  return (
    <div>{userRoleIsSigner ? <SignerComponent /> : <VerifierComponent />}</div>
  )
}
const SignerComponent = () => {
  const files = useAppSelector(selectFile)
  return (
    <Container id="sign-component">
      <ImportFilesSigner />
      <FilesContainer>
        <FileSpan>Files</FileSpan>
        {files.length === 0 ? <EmptyFilesList /> : <FileList />}
      </FilesContainer>
      <CenterLeftBubbleImage src={CenterLeftBubble} />
      <CenterRightBubbleImage src={CenterRightBubble} />
    </Container>
  )
}
const VerifierComponent = () => {
  const zippedFiles = useAppSelector(selectFilename)
  const files = useAppSelector(selectFile)

  return (
    <Container>
      <ImportFilesVerifier />
      <FilesContainer>
        {zippedFiles.length > 0 ? (
          <FileSpanZip>Files</FileSpanZip>
        ) : (
          <FileSpan>Files</FileSpan>
        )}
        <ZipFile />
        {zippedFiles.length === 0 && files.length > 0 && <VerifierFileList />}
        {files.length === 0 && <EmptyFilesList />}
      </FilesContainer>
      <CenterLeftBubbleImage src={CenterLeftBubble} />
      <CenterRightBubbleImage src={CenterRightBubble} />
    </Container>
  )
}
