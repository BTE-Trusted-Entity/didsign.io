import styled from 'styled-components'
import { colors } from './colors'

interface Style {
  setMargin?: boolean
}
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
export const LogoContainer = styled.div`
  width: 103px;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 400px) {
    display: none;
  }
`
export const Imprint = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  height: 480px;
  position: fixed;
  bottom: 113px;
  z-index: 40;
`
export const ImprintContainer = styled.div`
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${colors.silverblue};
  flex-direction: column;
  word-break: break-all;
  height: 522px;
  max-width: 484px;
  width: 90%;
  justify-content: center;
  align-items: center;
  color: ${colors.darkpurple};
  gap: 2px;
  border-radius: 8px;
`
export const ImprintText = styled.span`
  word-break: break-all;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  margin-bottom: ${(props: Style) => props.setMargin && '15px'};
  a {
    color: ${colors.mediumblue};
  }
`
export const Dismiss = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  height: 24px;
  width: 140px;
  border-radius: 8px;
  background-color: ${colors.mediumblue};
  margin-top: 30px;
  color: white;
  margin-bottom: 10px;
`
export const BTELogo = styled.img`
  height: 100px;
  margin-bottom: 30px;
  margin-top: 20px;
`
