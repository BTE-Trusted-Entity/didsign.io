import React from 'react'
import AttentionIcon from '../ImageAssets/icon_attention.svg'
import OkIcon from '../ImageAssets/icon_oK.svg'

import * as Styled from '../StyledComponents/Credential'

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
    <Styled.Credential>
      {isCredentialValid &&
        Object.keys(credential).map((key, index) => (
          <Styled.Property key={index}>
            <Styled.Name>{key}</Styled.Name>
            <Styled.Value>{credential[key]}</Styled.Value>
          </Styled.Property>
        ))}

      <Styled.Property>
        <Styled.Name>Attester</Styled.Name>
        <Styled.Value>{attesterDid}</Styled.Value>
      </Styled.Property>

      <Styled.Property>
        <Styled.Name>Valid</Styled.Name>
        <Styled.Value>
          <img src={isCredentialValid ? OkIcon : AttentionIcon} />
        </Styled.Value>
      </Styled.Property>
    </Styled.Credential>
  )
}
