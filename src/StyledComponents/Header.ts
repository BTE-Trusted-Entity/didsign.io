import styled from 'styled-components'
import { ReactComponent as Logo } from '../ImageAssets/logo_DIDsign.svg'
import { colors } from './colors'

interface BtnType {
  isSelectedRole: boolean
}
export const StyledHeader = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  height: 133px;
`
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 76px;
  background-color: ${colors.darkpurple};
`
export const TopLeftBubbleImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  height: 100%;
`
export const TopRightBubbleImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  pointer-events: none;
  height: 100%;
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
  background-color: ${colors.headerbelow};
  justify-content: center;
  align-items: center;
  position: relative;
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
  width: 374px;
  height: ${(props: BtnType) => (props.isSelectedRole ? '35px' : '28px')};
  background-color: ${(props: BtnType) =>
    props.isSelectedRole ? colors.silverblue : '#BBCFE2'};
  box-shadow: ${(props: BtnType) =>
    !props.isSelectedRole && 'inset 0 -1px 6px 0 rgba(0, 0, 0, 0.15);'};
  border: none;
  border-radius: 3px 3px 0 0;
  transition: height 0.15s ease-in;
  @media (max-width: 600px) {
    margin-bottom: -18px;
  }
`
export const SignUnderline = styled.div`
  height: ${(props: BtnType) => (props.isSelectedRole ? '4px' : '2px')};
  width: 130px;
  background-color: ${colors.pink};
  margin-top: -2px;
  transition: height 0.1s ease-in;
`
export const VerifyUnderline = styled.div`
  height: ${(props: BtnType) => (props.isSelectedRole ? '4px' : '2px')};
  width: 130px;
  background-color: ${colors.green};
  margin-top: -2px;
  transition: height 0.1s ease-in;
`
export const SecondaryLeftBubble = styled.img`
  height: 113px;
  width: 261px;
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  transform: scaleX(-1);
  pointer-events: none;
`
