import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import * as Styled from '../StyledComponents/Header'
import { paths } from '../Utils/paths'

export const Header = () => {
  return (
    <Styled.Header>
      <PrimaryHeader />
      <SecondaryHeader />
    </Styled.Header>
  )
}
const PrimaryHeader = () => {
  return (
    <Styled.PrimaryHeader>
      <Styled.LogoContainer>
        <Styled.HeaderLogoBtn
          aria-label="DID sign logo"
          onClick={() => window.location.reload()}
        />
      </Styled.LogoContainer>
    </Styled.PrimaryHeader>
  )
}

const SecondaryHeader = () => {
  const location = useLocation()
  const signer = location.pathname === paths.signer
  const veriifer = location.pathname === paths.verifier

  return (
    <Styled.SecondaryHeader>
      <Styled.Text>
        Documents that build trust - securely signed with your decentralized
        identifier (DID).
      </Styled.Text>
      <Styled.LinkContainer>
        <NavLink to={paths.signer}>
          <Styled.Wrapper isSelectedRole={signer}>
            <span>SIGN</span>
            <Styled.SignUnderline isSelectedRole={signer} />
          </Styled.Wrapper>
        </NavLink>

        <NavLink to={'/verifier'}>
          <Styled.Wrapper isSelectedRole={veriifer}>
            <span>Verify</span>

            <Styled.VerifyUnderline isSelectedRole={veriifer} />
          </Styled.Wrapper>
        </NavLink>
      </Styled.LinkContainer>
    </Styled.SecondaryHeader>
  )
}
