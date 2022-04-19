import styled from 'styled-components'
import { colors } from './colors'

interface Button {
  isDisabled: boolean
}
export const BtnContainer = styled.div`
  display: flex;
  gap: 8px;
`
export const SignButton = styled.button`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: white;
  opacity: ${(props: Button) => props.isDisabled && 0.6};
  max-width: 160px;
  width: 60vw;
  height: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.mediumblue};
  text-transform: uppercase;
`
