import styled from 'styled-components'

import InfoIcon from '../ImageAssets/iconBIG_info.svg'
import AttentionIcon from '../ImageAssets/iconBIG_attention.svg'
import PopupBubbles from '../ImageAssets/popup_bubbles.svg'
import Spinner from '../ImageAssets/puff.svg'
import BTELogo from '../ImageAssets/bte_logo_black.png'
import SignatureIcon from '../ImageAssets/icon_DID.svg'

import { colors } from './colors'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  top: 25%;
  margin-top: 3%;
  left: 0;
  position: fixed;
  z-index: 30;
`

export const Popup = styled.div`
  box-sizing: border-box;
  width: 90%;
  max-width: 300px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${PopupBubbles}) no-repeat bottom left, ${colors.silverBlue};
  border-radius: 5px;
  padding: 15px 30px 20px 30px;
  box-shadow: 1px 6px 9px 4px rgb(${colors.blackRGB} / 20%);
  color: ${colors.darkPurple};
`

export const Heading = styled.h1`
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.13px;
  font-family: Overpass;
  font-weight: normal;
  padding-top: 90px;
  margin-top: 0;
  margin-bottom: 24px;
  text-align: center;
  width: 100%;
`

export const InfoHeading = styled(Heading)`
  background: url(${InfoIcon}) no-repeat center top;
`

export const AttentionHeading = styled(Heading)`
  background: url(${AttentionIcon}) no-repeat center top;
`

export const SpinnerHeading = styled(Heading)`
  background: url(${Spinner}) no-repeat center top;
  padding-top: 80px;
`

export const SignatureHeading = styled(InfoHeading)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:before {
    content: '';
    display: inline-block;
    height: 18px;
    width: 10px;
    background: url(${SignatureIcon}) no-repeat center/auto;
  }
`

export const ImprintHeading = styled(Heading)`
  background: url(${BTELogo}) no-repeat center top/auto 100px;
  padding-top: 130px;
  font-size: 14px;
`

export const Text = styled.p`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.13px;
  font-family: Overpass;
  margin-top: 0;
  margin-bottom: 20px;
`

export const BottomText = styled(Text)`
  margin: 0;
`

export const Dismiss = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: Overpass;
  font-size: 12px;
  letter-spacing: 0.1px;
  height: 22px;
  width: 130px;
  border-radius: 6px;
  background-color: ${colors.mediumBlue};
  margin-top: 10px;
  padding-top: 3px;
  color: ${colors.white};
  border: none;
  text-transform: uppercase;
  cursor: pointer;
`

export const Imprint = styled(Container)`
  bottom: 113px;
  top: initial;
`

export const ImprintPopup = styled(Popup)`
  max-width: 484px;
  color: ${colors.darkPurple};
  gap: 2px;
  border-radius: 8px;
`

export const ImprintText = styled(Text)`
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: center;
  margin: 0;
  a {
    color: ${colors.mediumBlue};
  }
`

export const ImprintBottomText = styled(Text)`
  margin-top: 15px;
`
