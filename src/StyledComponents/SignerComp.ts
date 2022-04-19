import styled from 'styled-components'
import { colors } from './colors'

export const Container = styled.div`
  background-color: ${colors.silverblue};
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
  height: 445px;
`
export const FilesContainer = styled.div`
  width: 90%;
  position: relative;
  overflow-x: hidden;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  max-width: 766px;
  min-height: 211px;
  max-height: 900px;
  background-color: ${colors.lightbluetransparent};
  border-top: solid 1px;
  border-left: solid 1px;
  border-right: solid 1px;
  border-color: #517ca240;
`
export const FileSpan = styled.span`
  position: absolute;
  top: 16px;
  left: 32px;
  color: #2a223180;
  font-size: 16px;
  line-height: 17px;
  letter-spacing: 0.11px;
  width: 34px;
`
export const CenterLeftBubbleImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 105px;
  width: 343.5px;
  pointer-events: none;
`
export const CenterRightBubbleImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 105px;
  width: 248px;
  pointer-events: none;
`
