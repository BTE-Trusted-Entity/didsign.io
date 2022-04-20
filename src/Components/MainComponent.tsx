import React from 'react'
import { ImportFilesSigner } from './ImportFiles'
import { FileList } from './FileList'
import { useAppSelector } from '../app/hooks'
import { selectFile, selectFilename } from '../Features/Signer/FileSlice'
import { EmptyFilesList } from './EmptyFilesList'
import CenterRightBubble from '../ImageAssets/CenterRightBubble.svg'
import CenterLeftBubble from '../ImageAssets/CenterLeftBubble.svg'
import { Container } from '../StyledComponents/SignerComp'
import {
  CenterLeftBubbleImage,
  CenterRightBubbleImage,
  FilesContainer,
  FileSpan,
} from '../StyledComponents/SignerComp'
import { ZippedFile } from './Verifier/ZippedFile'
import { ZippedFilesList } from './Verifier/ZippedFilesList'
import { VerifierFileList } from './Verifier/VerifierFileList'
import { selectUserRole } from '../Features/Signer/UserSlice'
import { ImportFilesVerifier } from './Verifier/ImportFiles'

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
        <FileSpan>Files</FileSpan>
        <ZippedFile />
        {zippedFiles.length > 0 && <ZippedFilesList />}
        {zippedFiles.length === 0 && files.length > 0 && <VerifierFileList />}
        {files.length === 0 && <EmptyFilesList />}
      </FilesContainer>
      <CenterLeftBubbleImage src={CenterLeftBubble} />
      <CenterRightBubbleImage src={CenterRightBubble} />
    </Container>
  )
}
