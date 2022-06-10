import styled from 'styled-components'

import { ReactComponent as Loader } from '../ImageAssets/spinning-circles.svg'
import { colors } from './colors'

export const Container = styled.div`
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
  color: ${colors.darkPurple};
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
export const FetchButton = styled.button`
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
  background-color: ${colors.mediumBlue};
  img {
    margin-left: 15px;
    margin-right: 15px;
  }
  cursor: pointer;
`
export const ChevronImage = styled.img`
  position: absolute;
  top: 8px;
  right: 16px;
`
export const Separator = styled.div`
  border: 1px dotted ${colors.darkPurple};
  width: 100%;
`
