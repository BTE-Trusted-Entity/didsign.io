import styled from 'styled-components'
import { colors } from './colors'

export const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  width: 631px;
  gap: 15px;
  margin-right: 22px;
  margin-top: 10px;
  margin-bottom: 6px;
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const FileWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 96%;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  font-family: Overpass;
`
export const FileName = styled.span`
  color: ${colors.darkpurple};
  text-align: left;
  overflow-wrap: break-word;
  width: 70%;
  margin-left: 15px;
  margin-top: 6px;
  margin-bottom: 6px;
`
export const FileOptionsSpan = styled.span`
  display: flex;
  width: 30%;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 5px;
  color: ${colors.purered};
`
export const DidSignFileSpan = styled.span`
  display: flex;
  gap: 5px;
`
export const FilesSeparator = styled.div`
  width: 100%;
  border: dotted 1px ${colors.darkpurple};
  margin-top: 5px;
  opacity: 0.5;
`
