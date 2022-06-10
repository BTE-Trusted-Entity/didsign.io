import styled from 'styled-components'

import { colors } from './colors'

interface Button {
  isDisabled: boolean
}
export const SignContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`
export const OnchainInfo = styled.span`
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.2px;
  margin-bottom: 4px;
  a {
    color: ${colors.mediumBlue};
    :hover {
      text-decoration: underline;
    }
  }
`
export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  button {
    border: none;
  }
`
export const InfoButton = styled.button`
  background: none;
  cursor: pointer;
`
export const SignButton = styled.button`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: white;
  opacity: ${(props: Button) => props.isDisabled && 0.6};
  max-width: 160px;
  cursor: pointer;
  width: 60vw;
  height: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.mediumBlue};
  text-transform: uppercase;
`
