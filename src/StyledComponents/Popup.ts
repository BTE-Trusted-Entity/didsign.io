import styled from 'styled-components'
import { colors } from './colors'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  top: 25%;
  margin-top: 3%;
  position: fixed;
`

export const StyledPopup = styled.div`
  z-index: 40;
  max-width: 300px;
  min-height: 300px;
  background-color: ${colors.silverblue};
  border-radius: 15px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 16px;
  gap: 10px;
  padding: 0 8px 8px 8px;
  color: ${colors.darkpurple};
`

export const Heading = styled.span`
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.13px;
  font-family: Overpass;
`
export const Text = styled.span`
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.13px;
  font-family: Overpass;
  text-align: left;
  padding-left: 8px;
  padding-right: 8px;
`
