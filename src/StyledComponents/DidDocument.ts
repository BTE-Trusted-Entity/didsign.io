import styled from 'styled-components'

import { colors } from './colors'

import LinkIcon from '../ImageAssets/icon_link.svg'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
  margin-bottom: 100px;
`
export const TextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  gap: 20px;
  justify-content: flex-start;
  align-items: flex-start;
`
export const VerificationText = styled.span`
  display: flex;
  justify-content: center;
  color: green;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.11px;
  width: 80px;
`
export const VerificationErrorText = styled(VerificationText)`
  color: ${colors.orange};
`
export const VerificationIcon = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 70%;
`
export const Text = styled.span`
  display: flex;
  justify-content: flex-start;
  color: ${colors.darkPurple};
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.11px;
  font-weight: bold;
  word-break: break-all;
  width: 550px;
  a {
    color: ${colors.mediumBlue};
    padding-left: 10px;
    padding-right: 20px;
    background: url(${LinkIcon}) no-repeat right 40%;
  }
`
export const ErrorText = styled(Text)`
  color: ${colors.orange};
  word-break: normal;
`
export const EndpointsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  color: ${colors.darkPurple};
  font-size: 14px;
  gap: 20px;
  line-height: 22px;
  letter-spacing: 0.11px;
  word-break: break-all;
  width: 550px;
`
export const Title = styled.span`
  display: flex;
  justify-content: start;
  color: ${colors.darkPurple};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.11px;
  width: 80px;
  text-align: left;
`
export const ErrorTitle = styled(Title)`
  color: ${colors.orange};
`
