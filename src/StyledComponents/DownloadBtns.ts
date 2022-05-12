import styled from 'styled-components'
import { colors } from './colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 8px;
`
export const ZipBtnWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  line-height: 16px;
  font-family: Overpass;
  letter-spacing: 0.1px;
  max-width: 300px;
  width: 70%;
`
export const ZipTextSpan = styled.span`
  width: 90px;
  text-align: right;
  color: ${colors.darkpurple};
`
export const DownloadSignTextSpan = styled.span`
  width: 70px;
  text-align: right;
  font-size: 14px;
  line-height: 16px;
  color: ${colors.darkpurple};
`
export const ZipBtn = styled.button`
  width: 160px;
  height: 30px;
  color: white;
  background-color: ${colors.mediumblue};
  border-radius: 8px;
  color: white;
  border: none;
`
export const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  align-items: flex-end;
  width: 220px;
  margin-bottom: 6px;
  margin-left: 2px;
`
export const StyledProgressBar = styled.div`
  width: 160px;
  height: 6px;
  border-radius: 10px;
  border: solid 1px ${colors.mediumblue};
`
export const StyledProgress = styled.div`
  background-color: ${colors.mediumblue};
  height: 100%;
  border-radius: 10px;
`
export const ProgressSpan = styled.span`
  width: 160px;
  text-align: center;
  font-size: 12px;
  height: 10px;
  line-height: 16px;
  letter-spacing: 0.1px;
  font-family: Overpass;
  color: ${colors.darkpurple};
`
export const DownloadSignBtnWrapper = styled.div`
  display: flex;
  gap: 25px;
  justify-content: flex-start;
  align-items: center;
  max-width: 260px;
  width: 60%;
`
export const DownloadSignBtn = styled.button`
  width: 130px;
  height: 22px;
  background-color: ${colors.mediumblue};
  border-radius: 6px;
  color: white;
  font-size: 12px;
  line-height: 14px;
  border: none;
  letter-spacing: 0.09px;
`
