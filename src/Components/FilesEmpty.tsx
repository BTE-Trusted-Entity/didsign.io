import React from 'react'

import * as Styled from '../StyledComponents/FilesEmpty'

export const FilesEmpty = () => {
  const list = [1, 2, 3, 4]

  return (
    <Styled.Container>
      <Styled.Heading>Files</Styled.Heading>

      <Styled.List>
        {list.map((number) => (
          <Styled.EmptyLines key={number} />
        ))}
      </Styled.List>
    </Styled.Container>
  )
}
