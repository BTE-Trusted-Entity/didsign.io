import React from 'react'

import { colors } from '../StyledComponents/colors'

import * as Styled from '../StyledComponents/Animations'

interface Background {
  color: string
}
export const SlowAnimation = (props: Background) => {
  return (
    <Styled.Container bgcolor={props.color}>
      <Styled.Gradient />
      <Styled.Circle delay={'1s'} />
    </Styled.Container>
  )
}
export const FastAnimation = () => {
  return (
    <Styled.Container bgcolor={colors.fastAnimation}>
      <Styled.Gradient />
      <Styled.Circle delay={'1s'} />
      <Styled.Circle delay={'2s'} />
      <Styled.Circle delay={'3s'} />
      <Styled.Circle delay={'4s'} />
      <Styled.Circle delay={'5s'} />
    </Styled.Container>
  )
}
