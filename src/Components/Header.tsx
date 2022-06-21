import React from 'react'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectUserRole, updateRole } from '../Features/Signer/UserSlice'
import { useNavigate } from 'react-router-dom'
import { clearSign } from '../Features/Signer/SignatureSlice'
import { clearAll, clearFileName } from '../Features/Signer/FileSlice'
import { clearHash } from '../Features/Signer/hashSlice'
import {
  clearEndpoint,
  clearFileStatuses,
} from '../Features/Signer/EndpointSlice'
import { clearJWS } from '../Features/Signer/VerifyJwsSlice'

import * as Styled from '../StyledComponents/Header'

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
  const userRoleIsSigner = useAppSelector(selectUserRole)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleVerifier = () => {
    dispatch(updateRole(false))
    dispatch(clearSign())
    dispatch(clearAll())
    dispatch(clearHash())
    navigate('/verifier', { replace: true })
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
    navigate('/', { replace: true })
  }

  return (
    <Styled.SecondaryHeader>
      <Styled.Text>
        Documents that build trust - securely signed with your decentralized
        identifier (DID).
      </Styled.Text>

      <Styled.Buttons>
        <Styled.SignRoleButton
          isSelectedRole={userRoleIsSigner}
          onClick={() => handleSigner()}
        >
          SIGN
          <Styled.SignUnderline isSelectedRole={userRoleIsSigner} />
        </Styled.SignRoleButton>

        <Styled.SignRoleButton
          isSelectedRole={!userRoleIsSigner}
          onClick={() => handleVerifier()}
        >
          VERIFY
          <Styled.VerifyUnderline isSelectedRole={!userRoleIsSigner} />
        </Styled.SignRoleButton>
      </Styled.Buttons>
    </Styled.SecondaryHeader>
  )
}
