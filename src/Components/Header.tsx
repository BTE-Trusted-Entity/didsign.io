import React from 'react'
import TopRightBubble from '../ImageAssets/TopRightBubble.svg'
import TopLeftBubble from '../ImageAssets/TopLeftBubble.svg'
import SecondLeftBubble from '../ImageAssets/SecondHeaderBubble.svg'

import {
  Container,
  HeaderContainer,
  HeaderLogo,
  LogoContainer,
  SecondaryHeaderContainer,
  SecondaryLeftBubble,
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
import { clearSign } from '../Features/Signer/SignatureSlice'
import { clearAll, clearFileName } from '../Features/Signer/FileSlice'
import { clearHash } from '../Features/Signer/hashSlice'
import {
  clearEndpoint,
  clearFileStatuses,
} from '../Features/Signer/EndpointSlice'
import { clearJWS } from '../Features/Signer/VerifyJwsSlice'

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
    dispatch(clearSign())
    dispatch(clearAll())
    dispatch(clearHash())
  }
  const handleSigner = () => {
    dispatch(updateRole(true))
    dispatch(clearSign())
    dispatch(clearAll())
    dispatch(clearHash())
    dispatch(clearFileName())
    dispatch(clearEndpoint())
    dispatch(clearJWS())
    dispatch(clearFileStatuses())
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
      <SecondaryLeftBubble src={SecondLeftBubble} />
    </SecondaryHeaderContainer>
  )
}
