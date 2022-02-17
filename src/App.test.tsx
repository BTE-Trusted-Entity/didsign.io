import React from 'react'
import { render, screen } from '@testing-library/react'
import { DIDSign } from './Components/DIDSign'

test('renders learn react link', () => {
  render(<DIDSign />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
