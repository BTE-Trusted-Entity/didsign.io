import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../ImageAssets/logo_DIDsign.svg'
import PrimaryLeftBubbles from '../ImageAssets/PrimaryHeaderLeftBubbles.svg'
import PrimaryRightBubbles from '../ImageAssets/PrimaryHeaderRightBubbles.svg'
import SecondaryLeftBubbles from '../ImageAssets/SecondaryHeaderLeftBubbles.svg'
import SecondaryRightBubbles from '../ImageAssets/SecondaryHeaderRightBubbles.svg'
import { colors } from './colors'

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
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background: url(${SecondaryLeftBubbles}) no-repeat left 40px / auto 100%,
    url(${SecondaryRightBubbles}) no-repeat right 40px / auto 100%,
    ${colors.headerBelow};
`
export const Text = styled.span`
  display: flex;
  align-items: flex-end;
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
    visibility: hidden;
  }
`
export const LinkContainer = styled.nav`
  max-width: 766px;
  width: 90%;
  display: flex;
  align-items: flex-end;
  gap: 18px;
`
export const NavigationLink = styled(NavLink)`
  text-decoration: none;
  width: 374px;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.darkPurple};
  text-transform: uppercase;
  align-items: center;
  justify-content: flex-end;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 17px;
  height: 28px;
  background-color: #bbcfe2;
  box-shadow: inset 0 -1px 6px 0 rgba(0, 0, 0, 0.15);
  border: none;
  border-radius: 3px 3px 0 0;
  cursor: pointer;
  .active & {
    font-size: 18px;
    letter-spacing: 0.16px;
    line-height: 20px;
    height: 35px;
    background-color: ${colors.silverBlue};
  }
`
export const SignUnderline = styled.div`
  height: 2px;
  width: 130px;
  background-color: ${colors.pink};
  .active & {
    height: 4px;
  }
  margin-bottom: 1px;
`
export const VerifyUnderline = styled.div`
  height: 2px;
  width: 130px;
  background-color: ${colors.green};
  transition: height 0.1s ease-in;
  .active & {
    height: 4px;
  }
  margin-bottom: 1px;
`
