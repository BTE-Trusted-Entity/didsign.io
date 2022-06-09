import React from 'react'

import * as Styled from '../StyledComponents/Spinner'

interface Props {
  size?: number
}

export function Spinner({ size = 18 }: Props) {
  return <Styled.Spinner size={size} />
}
