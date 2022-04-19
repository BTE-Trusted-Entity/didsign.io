import styled from 'styled-components'
import { colors } from './colors'

export const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  max-width: 100vw;
  font-family: 'Overpass';
  overflow-y: auto;
  background-color: ${colors.lightblue};
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: #cee8ff;
    border-radius: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(62, 110, 153, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(62, 110, 153, 0.5);
  }
`
export const DarkOverlay = styled.div`
  background-color: black;
  opacity: 0.7;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 20;
  overflow-y: hidden;
`
export const LeftBubbleImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 234px;
  width: 220px;
  pointer-events: none;
`
export const RightBubbleImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 234px;
  width: 220px;
  pointer-events: none;
`
