import styled from 'styled-components'
import { colors } from './colors'

export const StyledFooter = styled.div`
  background-color: ${colors.darkpurple};
  height: 35px;
  min-height: fit-content;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: auto;
`

export const StyledFooterLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  max-width: 740px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  text-align: left;
`
export const DidSignLogoContainer = styled.div`
  width: 93px;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  @media (max-width: 400px) {
    display: none;
  }
`
export const LinksContainer = styled.div`
  width: 80%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  gap: 4px;
  @media (max-width: 400px) {
    width: 100%;
  }
  @media (max-width: 300px) {
    font-size: 12px;
  }
`
export const LogoContainer = styled.div`
  width: 103px;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 400px) {
    display: none;
  }
`
