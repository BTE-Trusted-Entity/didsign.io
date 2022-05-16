import React from 'react'
import AttentionIcon from '../ImageAssets/icon_attention.svg'
import OkIcon from '../ImageAssets/icon_oK.svg'
import {
  Container,
  CredentialContainer,
  CredentialSpan,
  CredentialTitle,
} from '../StyledComponents/Credential'

interface IDIDCredential {
  // eslint-disable-next-line
  credential: any
  attesterDid: string
  isCredentialValid: boolean
}

export const CredentialComponent = ({
  credential,
  attesterDid,
  isCredentialValid,
}: IDIDCredential) => {
  return (
    <CredentialContainer>
      {isCredentialValid &&
        Object.keys(credential).map((key, index) => (
          <Container key={index}>
            <CredentialTitle>{key}</CredentialTitle>
            <CredentialSpan>{credential[key]}</CredentialSpan>
          </Container>
        ))}
      <Container>
        <CredentialTitle>Attester</CredentialTitle>

        <CredentialSpan>{attesterDid}</CredentialSpan>
      </Container>
      <Container>
        <CredentialTitle>Valid</CredentialTitle>
        <CredentialSpan>
          {' '}
          <img src={isCredentialValid ? OkIcon : AttentionIcon} />
        </CredentialSpan>
      </Container>
    </CredentialContainer>
  )
}
