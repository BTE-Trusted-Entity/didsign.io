import styled from 'styled-components'
import { ReactComponent as Logo } from '../ImageAssets/logo_DIDsign.svg'
import PrimaryLeftBubbles from '../ImageAssets/PrimaryHeaderLeftBubbles.svg'
import PrimaryRightBubbles from '../ImageAssets/PrimaryHeaderRightBubbles.svg'
import SecondaryLeftBubbles from '../ImageAssets/SecondaryHeaderLeftBubbles.svg'
import SecondaryRightBubbles from '../ImageAssets/SecondaryHeaderRightBubbles.svg'
import { colors } from './colors'

interface BtnType {
  isSelectedRole: boolean
}
export const StyledHeader = styled.header`
  display: flex;
  width: 100vw;
  flex-direction: column;
  height: 133px;
`
export const PrimaryHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 76px;
  background: url(${PrimaryLeftBubbles}) no-repeat left 18px / auto 100%,
    url(${PrimaryRightBubbles}) no-repeat right/auto 110%, ${colors.darkpurple};
`
export const LogoContainer = styled.div`
  max-width: 766px;
  width: 90%;
`
export const HeaderLogo = styled(Logo)`
  width: 168.5;
  height: 52px;
`
export const SecondaryHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 65px;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url(${SecondaryLeftBubbles}) no-repeat left 40px / auto 100%,
    url(${SecondaryRightBubbles}) no-repeat right 40px / auto 100%,
    ${colors.headerbelow};
`
export const TextSpan = styled.span`
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
export const Container = styled.div`
  max-width: 766px;
  width: 90%;
  display: flex;
  align-items: flex-end;
  gap: 18px;
  margin-bottom: -10px;
`
export const SignRoleBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${(props: BtnType) => (props.isSelectedRole ? '18px' : '16px')};
  letter-spacing: ${(props: BtnType) =>
    props.isSelectedRole ? '0.16px' : '0.11px'};
  line-height: ${(props: BtnType) => (props.isSelectedRole ? '20px' : '17px')};
  width: 374px;
  gap: 5px;
  border: none;
  height: ${(props: BtnType) => (props.isSelectedRole ? '35px' : '28px')};
  background-color: ${(props: BtnType) =>
    props.isSelectedRole ? colors.silverblue : '#BBCFE2'};
  box-shadow: ${(props: BtnType) =>
    !props.isSelectedRole && 'inset 0 -1px 6px 0 rgba(0, 0, 0, 0.15);'};
  border: none;
  border-radius: 3px 3px 0 0;
  @media (max-width: 600px) {
    margin-bottom: -18px;
  }
`
export const SignUnderline = styled.div`
  height: ${(props: BtnType) => (props.isSelectedRole ? '4px' : '2px')};
  width: 130px;
  background-color: ${colors.pink};
  margin-top: -2px;
`
export const VerifyUnderline = styled.div`
  height: ${(props: BtnType) => (props.isSelectedRole ? '4px' : '2px')};
  width: 130px;
  background-color: ${colors.green};
  margin-top: -2px;
  transition: height 0.1s ease-in;
`
