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
export const ZipButtonWrapper = styled.div`
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
export const ZipText = styled.span`
  width: 90px;
  text-align: right;
  color: ${colors.darkPurple};
`
export const DownloadSignText = styled.span`
  width: 70px;
  text-align: right;
  font-size: 14px;
  line-height: 16px;
  color: ${colors.darkPurple};
`
export const ZipButton = styled.button`
  width: 160px;
  height: 30px;
  color: white;
  background-color: ${colors.mediumBlue};
  border-radius: 8px;
  color: white;
  border: none;
  cursor: pointer;
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
export const ProgressBar = styled.div`
  width: 160px;
  height: 6px;
  border-radius: 10px;
  border: solid 1px ${colors.mediumBlue};
`
export const Progress = styled.div`
  background-color: ${colors.mediumBlue};
  height: 100%;
  border-radius: 10px;
`
export const ProgressInfo = styled.span`
  width: 160px;
  text-align: center;
  font-size: 12px;
  height: 10px;
  line-height: 16px;
  letter-spacing: 0.1px;
  font-family: Overpass;
  color: ${colors.darkPurple};
`
export const DownloadSignButtonWrapper = styled.div`
  display: flex;
  gap: 25px;
  justify-content: flex-start;
  align-items: center;
  max-width: 260px;
  width: 60%;
`
export const DownloadSignButton = styled.button`
  width: 130px;
  height: 22px;
  background-color: ${colors.mediumBlue};
  border-radius: 6px;
  color: white;
  font-size: 12px;
  line-height: 14px;
  border: none;
  letter-spacing: 0.09px;
  cursor: pointer;
`
