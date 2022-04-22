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
`
export const FilesContainer = styled.div`
  max-width: 766px;
  min-height: 211px;
  max-height: 900px;
  width: 90%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  gap: 20px;
  background-color: ${colors.lightbluetransparent};
  border-top: solid 1px;
  border-left: solid 1px;
  border-right: solid 1px;
  border-color: #517ca240;
  position: relative;
`
export const FileSpan = styled.span`
  display: flex;
  justify-content: end;
  margin-top: 20px;
  color: #2a223180;
  font-size: 16px;
  line-height: 17px;
  letter-spacing: 0.11px;
  width: 15%;
`
export const FileSpanZip = styled.span`
  position: absolute;
  top: 50px;
  left: 70px;
  margin-top: 20px;
  color: ${colors.darkpurple};
  font-size: 16px;
  line-height: 17px;
  letter-spacing: 0.11px;
  width: 15%;
  @media (max-width: 700px) {
    left: 20px;
  }
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
