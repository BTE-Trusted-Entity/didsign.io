import React from 'react'
import TopRightBubble from '../ImageAssets/TopRightBubble.svg'
import TopLeftBubble from '../ImageAssets/TopLeftBubble.svg'
import {
  Container,
  HeaderContainer,
  HeaderLogo,
  LogoContainer,
  SecondaryHeaderContainer,
  SignRoleBtn,
  SignUnderline,
  StyledHeader,
  TextSpan,
  TopLeftBubbleImg,
  TopRightBubbleImg,
  VerifyUnderline,
} from '../StyledComponents/Header'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectUserRole, updateRole } from '../Features/Signer/UserSlice'

export const Header = () => {
  return (
    <StyledHeader>
      <PrimaryHeader />
      <SecondaryHeader />
    </StyledHeader>
  )
}
const PrimaryHeader = () => {
  return (
    <HeaderContainer>
      <TopLeftBubbleImg src={TopLeftBubble} />
      <TopRightBubbleImg src={TopRightBubble} />
      <LogoContainer>
        <HeaderLogo />
      </LogoContainer>
    </HeaderContainer>
  )
}

const SecondaryHeader = () => {
  const userRoleSigner = useAppSelector(selectUserRole)
  const dispatch = useAppDispatch()
  const handleVerifier = () => {
    dispatch(updateRole(false))
  }
  const handleSigner = () => {
    dispatch(updateRole(true))
  }
  return (
    <SecondaryHeaderContainer>
      <TextSpan>
        Documents that build trust - securely signed with your decentralized
        identifier (DID).
      </TextSpan>
      <Container>
        <SignRoleBtn
          isSelectedRole={userRoleSigner}
          onClick={() => handleSigner()}
        >
          SIGN
          <SignUnderline isSelectedRole={userRoleSigner} />
        </SignRoleBtn>
        <SignRoleBtn
          isSelectedRole={!userRoleSigner}
          onClick={() => handleVerifier()}
        >
          VERIFY
          <VerifyUnderline isSelectedRole={!userRoleSigner} />
        </SignRoleBtn>
      </Container>
    </SecondaryHeaderContainer>
  )
}
