import styled from 'styled-components'

import { colors } from './colors'

import * as Files from './Files'

export const Container = Files.Container

export const Heading = styled(Files.Heading)`
  color: ${colors.grey};
`
export const List = styled.div`
  grid-area: list;
  display: flex;
  flex-direction: column;
  gap: 45px;
  padding-top: 40px;
`
export const EmptyLines = styled.div`
  border: dotted 0.2px #4d6b85;
  opacity: 0.8;
`
