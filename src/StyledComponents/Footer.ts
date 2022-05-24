import styled from 'styled-components'
import { colors } from './colors'

export const Footer = styled.footer`
  background-color: ${colors.darkPurple};
  height: 35px;
  min-height: fit-content;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: auto;
`

export const FooterLinks = styled.div`
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
export const DidSignLogo = styled.div`
  width: 93px;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  @media (max-width: 400px) {
    display: none;
  }
`

export const Links = styled.div`
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
  a {
    color: white;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
  span {
    color: white;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`
export const KiltLogo = styled.div`
  width: 103px;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 400px) {
    display: none;
  }
`
