import styled from 'styled-components'
import { colors } from './colors'

export const Container = styled.div`
  width: 100vw;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  height: 95px;
  justify-content: center;
  align-items: flex-start;
`
export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 766px;
  background-color: ${colors.bottomsection};
  width: 90%;
  margin-bottom: 10px;
  height: 95px;
  border-radius: 0 0 15px 15px;
  border: solid 1px;
  border-color: rgba(81, 124, 162, 0.25);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`
