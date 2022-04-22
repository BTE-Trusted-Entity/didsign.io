import styled from 'styled-components'
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

export const StyledPopup = styled.div`
  max-width: 300px;
  height: fit-content;
  background-color: ${colors.silverblue};
  border-radius: 15px;
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
  color: ${colors.darkpurple};
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
export const DismissBtn = styled.button`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: white;
  max-width: 130px;
  width: 60vw;
  height: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.mediumblue};
  text-transform: uppercase;
  margin-bottom: 10px;
  margin-top: 20px;
`
