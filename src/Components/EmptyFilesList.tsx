import React from 'react'
import { Container, EmptyLines } from '../StyledComponents/EmptyFileComp'

export const EmptyFilesList = () => {
  const list = [1, 2, 3, 4]
  return (
    <Container>
      {list.map((number) => (
        <EmptyLines key={number}></EmptyLines>
      ))}
    </Container>
  )
}
