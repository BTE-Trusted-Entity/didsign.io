import styled from 'styled-components'
import { colors } from './colors'
import DidsignLogo from '../ImageAssets/logo_DIDsign.svg'
import KiltLogo from '../ImageAssets/Kilt.svg'

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
  height: 80%;
  max-width: 740px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  text-align: left;
  background: url(${DidsignLogo}) no-repeat center left,
    url(${KiltLogo}) no-repeat center right/100px;

  @media (max-width: 400px) {
    background: none;
  }
`

export const Links = styled.div`
  width: 80%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
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
`

export const Imprint = styled.button`
  color: ${colors.white};
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  font-family: Overpass;
  font-size: 14px;
  line-height: 16px;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 300px) {
    font-size: 12px;
  }
`
