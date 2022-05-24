import styled from 'styled-components'

import { colors } from './colors'

import DelIcon from '../ImageAssets/icon_delete.svg'
import DIDIcon from '../ImageAssets/doc_signature_NEW.svg'
import ImageIcon from '../ImageAssets/doc_image.svg'
import DocIcon from '../ImageAssets/doc_generic.svg'

export const Container = styled.div`
  display: grid;
  grid-template: 'heading list' / 15% auto;
  column-gap: 20px;
  box-sizing: border-box;
  align-content: start;
  max-width: 766px;
  min-height: 211px;
  max-height: 900px;
  width: 90%;
  padding-right: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${colors.fileSection};
  border-style: solid;
  border-color: #517ca240;
  border-width: 1px 1px 0 1px;
`
export const Heading = styled.h2`
  grid-area: heading;
  display: flex;
  justify-content: end;
  margin: 0;
  padding-top: 20px;
  color: ${colors.darkPurple};
  font-size: 16px;
  line-height: 17px;
  letter-spacing: 0.11px;
  font-weight: normal;
`
export const List = styled.ul`
  grid-area: list;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 0;
  padding: 10px 0 6px;
`
export const File = styled.li`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  font-family: Overpass;
  border-bottom: dotted 2px ${colors.mediumBlue};
  padding: 0 16px 5px 0;
  margin: 0;
  min-height: 40px;
`
export const FileName = styled.p`
  color: ${colors.darkPurple};
  margin: 0;
  padding-left: 30px;
  min-height: 30px;
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
  background-position: top left;
`
export const DidFile = styled(FileName)`
  background-image: url(${DIDIcon});
  color: ${colors.pureRed};
`
export const ImageFile = styled(FileName)`
  background-image: url(${ImageIcon});
`
export const DocFile = styled(FileName)`
  background-image: url(${DocIcon});
`
export const IconButton = styled.button`
  height: 18px;
  width: 18px;
  border: none;
  padding: 0;
`
export const DeleteButton = styled(IconButton)`
  background: url(${DelIcon}) no-repeat center;
`
