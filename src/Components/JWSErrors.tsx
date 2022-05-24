import React from 'react'
import { useAppSelector } from '../app/hooks'
import { selectJwsSignStatus } from '../Features/Signer/VerifyJwsSlice'
import AttentionIcon from '../ImageAssets/icon_attention.svg'

import * as Styled from '../StyledComponents/JWSErrors'

export const JWSErrors = () => {
  const jwsStatus = useAppSelector(selectJwsSignStatus)
  if (jwsStatus === 'Multiple Sign') {
    return null
  }
  return (
    <Styled.Container>
      <Styled.TextWrapper>
        <Styled.VerificationErrorText>
          Verification
        </Styled.VerificationErrorText>

        <Styled.VerificationIcon>
          <img src={AttentionIcon} />
        </Styled.VerificationIcon>
      </Styled.TextWrapper>

      <Styled.TextWrapper>
        <Styled.ErrorTitle>Attention</Styled.ErrorTitle>

        {jwsStatus === 'Corrupted' && (
          <Styled.ErrorText>
            The signature file is corrupted. Please make sure to import the
            correct signature file.
          </Styled.ErrorText>
        )}

        {jwsStatus === 'Invalid' && (
          <Styled.ErrorText>
            The signature does not match with the imported files. Please make
            sure to import the correct files.
          </Styled.ErrorText>
        )}
      </Styled.TextWrapper>
    </Styled.Container>
  )
}
