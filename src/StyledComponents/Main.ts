import styled from 'styled-components'

import { colors } from './colors'

export const Container = styled.div`
  background-color: ${colors.silverBlue};
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
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
