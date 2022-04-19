import React from 'react'
import { Circle, Container, Gradient } from '../StyledComponents/Animations'
import { colors } from '../StyledComponents/colors'

interface Background {
  color: string
}
export const SlowAnimation = (props: Background) => {
  return (
    <Container bgcolor={props.color}>
      <Gradient></Gradient>
      <Circle delay={'1s'}></Circle>
    </Container>
  )
}
export const FastAnimation = () => {
  return (
    <Container bgcolor={colors.fastanimation}>
      <Gradient> </Gradient>
      <Circle delay={'1s'}></Circle>
      <Circle delay={'2s'}></Circle>
      <Circle delay={'3s'}></Circle>
      <Circle delay={'4s'}></Circle>
      <Circle delay={'5s'}></Circle>
    </Container>
  )
}
