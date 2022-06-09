import styled from 'styled-components'

import { colors } from './colors'

interface Style {
  setMargin?: boolean
}

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
  max-width: 320px;
  height: fit-content;
  background-color: ${colors.silverBlue};
  border-radius: 5px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  gap: 10px;
  padding: 0 8px 8px 8px;
  color: ${colors.darkPurple};
`

export const Heading = styled.span`
  display: flex;
  gap: 5px;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.13px;
  font-family: Overpass;
  margin-top: 10px;
`
export const Text = styled.span`
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.13px;
  font-family: Overpass;
  text-align: left;
  padding-left: 8px;
  padding-right: 8px;
  margin-top: 20px;
`
export const BottomText = styled(Text)`
  margin-bottom: 30px;
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
  background-color: ${colors.mediumBlue};
  margin-top: 30px;
  color: white;
  margin-bottom: 10px;
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
  background-color: ${colors.silverBlue};
  flex-direction: column;
  word-break: break-all;
  height: 522px;
  max-width: 484px;
  width: 90%;
  justify-content: center;
  align-items: center;
  color: ${colors.darkPurple};
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
    color: ${colors.mediumBlue};
  }
`
export const BTELogo = styled.img`
  height: 100px;
  margin-bottom: 30px;
  margin-top: 20px;
`
