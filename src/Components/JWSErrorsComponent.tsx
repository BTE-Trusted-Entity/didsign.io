import React from 'react'
import { useAppSelector } from '../app/hooks'
import { selectJwsSignStatus } from '../Features/Signer/VerifyJwsSlice'
import AttentionIcon from '../ImageAssets/icon_attention.svg'
import {
  DidDocContainer,
  ErrorText,
  ErrorTitle,
  TextWrapper,
  VerificationErrorText,
  VerificationIcon,
} from '../StyledComponents/DidDocument'

export const JWSErrorsComponent = () => {
  const jwsStatus = useAppSelector(selectJwsSignStatus)
  if (jwsStatus === 'Multiple Sign') {
    return null
  }
  return (
    <DidDocContainer>
      <TextWrapper>
        <VerificationErrorText>Verification</VerificationErrorText>
        <VerificationIcon>
          <img src={AttentionIcon} />{' '}
        </VerificationIcon>
      </TextWrapper>
      <TextWrapper>
        <ErrorTitle>Attention</ErrorTitle>
        {jwsStatus === 'Corrupted' && (
          <ErrorText>
            The signature file is corrupted. Please make sure to import the
            correct signature file.
          </ErrorText>
        )}
        {jwsStatus === 'Invalid' && (
          <ErrorText>
            The signature does not match with the imported files. Please make
            sure to import the correct files.
          </ErrorText>
        )}
      </TextWrapper>
    </DidDocContainer>
  )
}
