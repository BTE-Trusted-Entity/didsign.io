import React from 'react'
import { useAppSelector } from '../app/hooks'
import { selectJwsSignStatus } from '../Features/Signer/VerifyJwsSlice'
import AttentionIcon from '../ImageAssets/icon_attention.svg'
import {
  DidDocContainer,
  ErrorText,
  TextWrapper,
  Title,
  VerificationIcon,
  VerifiedText,
} from '../StyledComponents/DidDocument'

export const JWSErrorsComponent = () => {
  const jwsStatus = useAppSelector(selectJwsSignStatus)
  if (jwsStatus === 'Multiple Sign') {
    return null
  }
  return (
    <DidDocContainer>
      <TextWrapper>
        <VerifiedText error>Verification</VerifiedText>
        <VerificationIcon>
          <img src={AttentionIcon} />{' '}
        </VerificationIcon>
      </TextWrapper>
      <TextWrapper>
        <Title error>Attention</Title>
        {jwsStatus === 'Corrupted' && (
          <ErrorText error>
            The signature does not match with the imported files. Please make
            sure to import the correct files.
          </ErrorText>
        )}
        {jwsStatus === 'Invalid' && (
          <ErrorText error>
            The signature does not match with the imported files. Please make
            sure to import the correct files.
          </ErrorText>
        )}
      </TextWrapper>
    </DidDocContainer>
  )
}
