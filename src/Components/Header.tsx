import React from 'react'
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
  return (
    <Styled.SecondaryHeader>
      <Styled.Text>
        Documents that build trust - securely signed with your decentralized
        identifier (DID).
      </Styled.Text>
      <Styled.LinkContainer>
        <Styled.NavigationLink to={paths.signer}>
          <Styled.Wrapper>
            <span>SIGN</span>
            <Styled.SignUnderline />
          </Styled.Wrapper>
        </Styled.NavigationLink>
        <Styled.NavigationLink to={paths.verifier}>
          <Styled.Wrapper>
            <span>Verify</span>

            <Styled.VerifyUnderline />
          </Styled.Wrapper>
        </Styled.NavigationLink>
      </Styled.LinkContainer>
    </Styled.SecondaryHeader>
  )
}
