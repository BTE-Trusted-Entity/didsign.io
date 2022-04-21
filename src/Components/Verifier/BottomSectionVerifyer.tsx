import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  clearEndpoint,
  clearFileStatuses,
  fileStatus,
  selectServiceEndpoints,
  selectVerifiedDid,
  selectVerifiedSign,
  selectW3Name,
} from '../../Features/Signer/EndpointSlice'
import OkIcon from '../../ImageAssets/icon_oK.svg'
import BtnStartOver from '../../ImageAssets/button_start_over_NEW.svg'
import { clearAll, clearFileName } from '../../Features/Signer/FileSlice'
import { clearHash } from '../../Features/Signer/hashSlice'
import {
  clearJWS,
  selectJwsSign,
  selectJwsSignStatus,
} from '../../Features/Signer/VerifyJwsSlice'
import spinner from '../../ImageAssets/puff.svg'

import { JWSErrorsComponent } from './JWSErrorsComponent'
import { InvalidFileStatusError } from './InvalidFileStatusError'
import SignatureIcon from '../../ImageAssets/icon_DID.svg'
import { clearSign } from '../../Features/Signer/SignatureSlice'
import { CredentialContainer } from './CredentialContainer'
import {
  BottomSection,
  Container,
  VerificationLoader,
  VerificationText,
} from '../../StyledComponents/BottomSection'
import {
  DidDocContainer,
  VerificationIcon,
  TextWrapper,
  VerifiedText,
  Text,
  Title,
  EndpointsWrapper,
} from '../../StyledComponents/DidDocument'

export const BottomSectionVerifyer = () => {
  const sign = useAppSelector(selectVerifiedSign)
  const did = useAppSelector(selectVerifiedDid)
  const w3name = useAppSelector(selectW3Name)
  const seviceEndpoints = useAppSelector(selectServiceEndpoints)
  const jwsStatus = useAppSelector(selectJwsSignStatus)

  const DidDocument = () => {
    if (jwsStatus === 'Not Checked' || jwsStatus === 'Validating') return null

    if (jwsStatus !== 'Verified') {
      return <JWSErrorsComponent />
    } else {
      return (
        <DidDocContainer>
          <TextWrapper>
            <VerifiedText>Verification</VerifiedText>
            <VerificationIcon>
              <img src={OkIcon} />{' '}
            </VerificationIcon>
          </TextWrapper>
          <TextWrapper>
            <Title>Signature</Title>
            <Text>{sign}</Text>
          </TextWrapper>
          <TextWrapper>
            <Title>Signed By</Title>
            <Text>{did}</Text>
          </TextWrapper>
          <TextWrapper>
            <Title>web3name</Title>
            <Text>{`w3n:${w3name}`}</Text>
          </TextWrapper>
          <TextWrapper>
            <Title>Service Endpoints</Title>
            <EndpointsWrapper>
              {seviceEndpoints.map((endpoint) => (
                <CredentialContainer
                  url={endpoint.urls[0]}
                  endpointType={endpoint.types[0]}
                  key={endpoint.id}
                />
              ))}
            </EndpointsWrapper>
          </TextWrapper>
        </DidDocContainer>
      )
    }
  }

  return (
    <Container>
      <BottomSection>
        {jwsStatus === 'Validating' && <VerificationLoader src={spinner} />}
        {jwsStatus === 'Not Checked' && (
          <VerificationText>Verification</VerificationText>
        )}

        <DidDocument />
      </BottomSection>
    </Container>
  )
}
