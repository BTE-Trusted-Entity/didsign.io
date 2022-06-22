import styled from 'styled-components'

import * as Files from './Files'

import ZipIcon from '../ImageAssets/doc_zip_NEW.svg'
import OkIcon from '../ImageAssets/icon_ok.svg'
import AttentionIcon from '../ImageAssets/icon_attention.svg'

export const Container = Files.Container
export const Heading = Files.Heading
export const List = Files.List
export const DidSignFile = Files.DidSignFile
export const ImageFile = Files.ImageFile
export const DocFile = Files.DocFile
export const DeleteButton = Files.DeleteButton
export const FileName = Files.FileName

export const File = styled(Files.File)`
  background: ${({ statusOk }: { statusOk: boolean }) =>
    statusOk
      ? `url(${OkIcon}) content-box no-repeat center right 32px`
      : `url(${AttentionIcon}) content-box no-repeat center right 32px`};
`

export const ZipContainer = styled(Container)`
  grid-template: 'zip zip' 'heading list' / 15% auto;
`

export const ZipFile = styled(Files.File)`
  grid-area: zip;
  padding: 10px 16px 5px 0;
  width: 90%;
  justify-self: end;
`

export const ZipFileName = styled(Files.FileName)`
  background-image: url(${ZipIcon});
`

export const UnzippedFile = styled(Files.File)`
  background: ${({ statusOk }: { statusOk: boolean }) =>
    statusOk
      ? `url(${OkIcon}) content-box no-repeat center right`
      : `url(${AttentionIcon}) content-box no-repeat center right`};
`
