import styled from 'styled-components'
import { colors } from './colors'
import { ReactComponent as Loader } from '../ImageAssets/spinning-circles.svg'

export const DidDocContainer = styled.div`
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
  color: ${colors['attention-orange']};
`
export const VerificationIcon = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 70%;
`
export const Text = styled.span`
  display: flex;
  justify-content: flex-start;
  color: ${colors.darkpurple};
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.11px;
  font-weight: bold;
  word-break: break-all;
  width: 550px;
`
export const ErrorText = styled(Text)`
  color: ${colors['attention-orange']};
  word-break: normal;
`
export const EndpointsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  color: ${colors.darkpurple};
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
  color: ${colors.darkpurple};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.11px;
  width: 80px;
  text-align: left;
`
export const ErrorTitle = styled(Title)`
  color: ${colors['attention-orange']};
`
export const EndpointsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: fit-content;
  width: 100%;
`
export const EndpointTypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
export const EndpointSpan = styled.span`
  color: ${colors.darkpurple};
  font-family: Overpass;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  max-width: 400px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;

  text-overflow: ellipsis;
`
export const EndpointURLSpan = styled.span`
  font-family: Overpass;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.1px;
  max-width: 400px;
  overflow-wrap: break-word;
`
export const FetchLoader = styled(Loader)`
  height: 15px;
  width: 15px;
  margin-right: 18px;
`
export const FetchBtn = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  text-transform: uppercase;
  margin-left: auto;
  font-size: 12px;
  border: none;
  line-height: 13px;
  width: 130px;
  height: 22px;
  border-radius: 6px;
  color: white;
  background-color: ${colors.mediumblue};
  img {
    margin-left: 15px;
    margin-right: 15px;
  }
`
export const ChevronImage = styled.img`
  position: absolute;
  top: 8px;
  right: 16px;
`
export const Separator = styled.div`
  border: 1px dotted ${colors.darkpurple};
  width: 100%;
`
