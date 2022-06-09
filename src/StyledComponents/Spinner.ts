import styled from 'styled-components'

import Puff from '../ImageAssets/puff.svg'

interface Props {
  size: number
}

export const Spinner = styled.span`
  display: inline-block;
  height: ${({ size }: Props) => `${size}px`};
  width: ${({ size }: Props) => `${size}px`};
  background: url(${Puff}) no-repeat center/100%;
`
