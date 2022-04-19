import React from 'react'
import { ImportFilesSigner } from './ImportFiles'
import { FileList } from './FileList'
import { useAppSelector } from '../app/hooks'
import { selectFile } from '../Features/Signer/FileSlice'
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

export const SignerComponent = () => {
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
