import styled from 'styled-components'
import Logo from '../ImageAssets/logo_DIDsign.svg'
import PrimaryLeftBubbles from '../ImageAssets/PrimaryHeaderLeftBubbles.svg'
import PrimaryRightBubbles from '../ImageAssets/PrimaryHeaderRightBubbles.svg'
import SecondaryLeftBubbles from '../ImageAssets/SecondaryHeaderLeftBubbles.svg'
import SecondaryRightBubbles from '../ImageAssets/SecondaryHeaderRightBubbles.svg'
import { colors } from './colors'

interface ButtonType {
  isSelectedRole: boolean
}
export const Header = styled.header`
  display: flex;
  width: 100vw;
  flex-direction: column;
  height: 133px;
`
export const PrimaryHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 76px;
  background: url(${PrimaryLeftBubbles}) no-repeat left 18px / auto 100%,
    url(${PrimaryRightBubbles}) no-repeat right/auto 110%, ${colors.darkPurple};
`
export const LogoContainer = styled.div`
  max-width: 766px;
  width: 90%;
`
export const HeaderLogoBtn = styled.button`
  width: 168.5px;
  height: 52px;
  border: none;
  background: url(${Logo}) no-repeat;
  cursor: pointer;
`
export const SecondaryHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 65px;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url(${SecondaryLeftBubbles}) no-repeat left 40px / auto 100%,
    url(${SecondaryRightBubbles}) no-repeat right 40px / auto 100%,
    ${colors.headerBelow};
  a {
    text-decoration: none;
  }
`
export const Text = styled.span`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 766px;
  width: 90%;
  color: #ddf0ff;
  font-family: Overpass;
  font-size: 14px;
  margin-bottom: 5px;
  letter-spacing: 0.1px;
  line-height: 16px;
  @media (max-width: 600px) {
    display: none;
  }
`
export const LinkContainer = styled.div`
  max-width: 766px;
  width: 90%;
  display: flex;
  align-items: flex-end;
  gap: 18px;
  margin-bottom: -10px;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.darkPurple};
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
  font-size: ${(props: ButtonType) => (props.isSelectedRole ? '18px' : '16px')};
  letter-spacing: ${(props: ButtonType) =>
    props.isSelectedRole ? '0.16px' : '0.11px'};
  line-height: ${(props: ButtonType) =>
    props.isSelectedRole ? '20px' : '17px'};
  width: 374px;
  gap: 5px;
  height: ${(props: ButtonType) => (props.isSelectedRole ? '35px' : '28px')};
  background-color: ${(props: ButtonType) =>
    props.isSelectedRole ? colors.silverBlue : '#BBCFE2'};
  box-shadow: ${(props: ButtonType) =>
    !props.isSelectedRole && 'inset 0 -1px 6px 0 rgba(0, 0, 0, 0.15);'};
  border: none;
  border-radius: 3px 3px 0 0;
  @media (max-width: 600px) {
    margin-bottom: -18px;
  }
  cursor: pointer;
`
export const SignUnderline = styled.div`
  height: ${(props: ButtonType) => (props.isSelectedRole ? '4px' : '2px')};
  width: 130px;
  background-color: ${colors.pink};
  margin-top: -2px;
`
export const VerifyUnderline = styled.div`
  height: ${(props: ButtonType) => (props.isSelectedRole ? '4px' : '2px')};
  width: 130px;
  background-color: ${colors.green};
  margin-top: -2px;
  transition: height 0.1s ease-in;
`
