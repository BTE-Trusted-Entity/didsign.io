import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  max-width: 766px;
  width: 90%;
  height: 220px;
  position: relative;
  margin-top: 12px;
`
export const DropContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
`
export const ImportImage = styled.img`
  position: absolute;
  margin: auto;
`
export const SignText = styled.span`
  position: absolute;
  top: 32px;
  pointer-events: none;
  color: white;
  text-align: center;
  font-size: 16px;
  line-height: 17px;
  letter-spacing: 0.11px;
`
export const DragDropText = styled.span`
  position: absolute;
  top: 56px;
  pointer-events: none;
  color: white;
  text-align: center;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.11px;
`
export const BrowseFilesText = styled.span`
  position: absolute;
  bottom: 48px;
  pointer-events: none;
  color: white;
  text-align: center;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.11px;
`
