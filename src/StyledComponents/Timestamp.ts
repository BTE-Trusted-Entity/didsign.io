import styled from 'styled-components'

import { colors } from './colors'

import ChevronDown from '../ImageAssets/chevron_down_dark.svg'
import ChevronUp from '../ImageAssets/chevron_up_dark.svg'
import TimestampIcon from '../ImageAssets/timestamp.svg'

export const Container = styled.div`
  box-sizing: border-box;
  min-height: 45px;
  padding: 5px 2px 5px 25px;
  border-bottom: dotted 2px ${colors.mediumBlue};
`
export const Timestamp = styled.div`
  min-height: 34px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  border-radius: 2px;
  padding-right: 6px;
  background: rgb(${colors.orangeRGB} / 20%);

  @media (max-width: 850px) {
    flex-direction: column;
    padding: 5px;
  }
`
export const Heading = styled.h3`
  margin: 0;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: normal;
  padding-left: 36px;
  min-height: 34px;
  background: url(${TimestampIcon}) no-repeat center left 5px;
`

export const Section = styled.section`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: 20px;

  @media (max-width: 750px) {
    flex-direction: column;
    gap: 5px;
  }
`
export const Fee = styled.p`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
`
export const Button = styled.button`
  width: 100px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${colors.orange};
  color: ${colors.white};
  font-family: Overpass;
  font-size: 12px;
  border-style: none;
  border-radius: 6px;
  text-transform: uppercase;
  cursor: pointer;

  &:disabled {
    background: ${colors.orangeSecondary};
    color: rgb(${colors.whiteRGB} / 50%);
    pointer-events: none;
  }
`
export const Select = styled.div`
  width: 355px;
  position: relative;
  font-size: 14px;
  color: ${colors.darkPurple};

  @media (max-width: 600px) {
    width: 300px;
  }
  @media (max-width: 500px) {
    width: 200px;
  }
`
export const Open = styled.button`
  padding: 2px 30px 2px 6px;
  margin: 0;
  border-top: 1px solid ${colors.darkPurple};
  border-right: 1px solid ${colors.darkPurple};
  border-left: 1px solid ${colors.darkPurple};
  border-bottom: 1px solid ${colors.darkPurple};
  border-radius: 2px 2px 0 0;
  height: 22px;
  width: 100%;
  text-align: start;
  font-family: Overpass;
  font-size: 14px;
  background: url(${ChevronDown}) no-repeat top 8px right 9px,
    ${colors.dropdown};
  cursor: pointer;
  color: ${({ hasSelectedAccount }: { hasSelectedAccount: boolean }) =>
    hasSelectedAccount ? 'inherit' : `rgb(${colors.greyRGB} / 75%)`};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
export const Close = styled(Open)`
  background: url(${ChevronUp}) no-repeat top 8px right 9px, ${colors.dropdown};
  border-bottom: none;
`

export const Options = styled.ul`
  list-style: none;
  padding: 0 30px 0 6px;
  position: absolute;
  left: 0;
  right: 0;
  border-style: solid;
  border-width: 0 1px 1px 1px;
  border-color: ${colors.darkPurple};
  border-radius: 0 0 2px 2px;
  background: ${colors.dropdown};
`
export const Option = styled.li`
  box-sizing: border-box;
  height: 33px;
  display: flex;
  align-items: center;
  border-top: 2px dotted ${colors.mediumBlue};
  padding: 2px 0;
  cursor: pointer;

  &:hover,
  &:focus {
    background: content-box rgb(${colors.orangeRGB} / 20%);
  }

  p {
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`
