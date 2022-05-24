import styled from 'styled-components'

import { colors } from './colors'

import InfoIcon from '../ImageAssets/icon_info.svg'

import * as Files from './Files'

export const Container = Files.Container
export const Heading = Files.Heading
export const List = Files.List
export const File = Files.File
export const DidFile = Files.DidFile
export const ImageFile = Files.ImageFile
export const DocFile = Files.DocFile
export const DeleteButton = Files.DeleteButton

export const DidSignInfo = styled.p`
  margin: 0;
  color: ${colors.pureRed};
  display: flex;
  align-items: flex-start;
  gap: 10px;
`

const IconButton = Files.IconButton
export const InfoButton = styled(IconButton)`
  background: url(${InfoIcon}) no-repeat center right;
`
