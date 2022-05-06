import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { SignBtn } from './SignBtn'
import { clearSign, selectSign } from '../Features/Signer/SignatureSlice'
import { DownloadBtns } from './DownloadBtns'
import {
  BottomSection,
  Container,
  StartOverIcon,
  VerificationLoader,
  VerificationTextSpan,
} from '../StyledComponents/BottomSection'
import {
  clearEndpoint,
  clearFileStatuses,
  selectServiceEndpoints,
  selectVerifiedDid,
  selectVerifiedSign,
  selectW3Name,
} from '../Features/Signer/EndpointSlice'
import {
  clearJWS,
  selectJwsSignStatus,
} from '../Features/Signer/VerifyJwsSlice'
import { clearAll, clearFileName } from '../Features/Signer/FileSlice'
import { clearHash } from '../Features/Signer/hashSlice'
import {
  DidDocContainer,
  VerificationIcon,
  TextWrapper,
  VerificationText,
  Text,
  Title,
  EndpointsWrapper,
} from '../StyledComponents/DidDocument'
import { JWSErrorsComponent } from './JWSErrorsComponent'
import OkIcon from '../ImageAssets/icon_oK.svg'
import BtnStartOver from '../ImageAssets/button_start_over_NEW.svg'
import spinner from '../ImageAssets/puff.svg'
import { DidDocumentComponent } from './DidDocumentComponent'
import { selectUserRole } from '../Features/Signer/UserSlice'

export const BottomSectionComponent = () => {
  const userRoleSigner = useAppSelector(selectUserRole)
  if (userRoleSigner) return <BottomSectionSigner />
  else return <BottomSectionVerifyer />
}

const BottomSectionSigner = () => {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(clearSign())
    dispatch(clearAll())
    dispatch(clearHash())
  }
  const sign = useAppSelector(selectSign)
  return (
    <Container>
      <BottomSection>
        {!sign ? <SignBtn /> : <DownloadBtns />}
        {sign && (
          <StartOverIcon onClick={() => handleDelete()} src={BtnStartOver} />
        )}
      </BottomSection>
    </Container>
  )
}
const BottomSectionVerifyer = () => {
  const sign = useAppSelector(selectVerifiedSign)
  const did = useAppSelector(selectVerifiedDid)
  const w3name = useAppSelector(selectW3Name)
  const seviceEndpoints = useAppSelector(selectServiceEndpoints)
  const jwsStatus = useAppSelector(selectJwsSignStatus)
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(clearSign())
    dispatch(clearAll())
    dispatch(clearHash())
    dispatch(clearFileName())
    dispatch(clearEndpoint())
    dispatch(clearJWS())
    dispatch(clearFileStatuses())
  }
  const DidDocument = () => {
    if (jwsStatus === 'Not Checked' || jwsStatus === 'Validating') return null

    if (jwsStatus !== 'Verified') {
      return <JWSErrorsComponent />
    } else {
      return (
        <DidDocContainer>
          <TextWrapper>
            <VerificationText>Verification</VerificationText>
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
            <Text>{w3name}</Text>
          </TextWrapper>
          <TextWrapper>
            <Title>Service Endpoints</Title>
            <EndpointsWrapper>
              {seviceEndpoints.map((endpoint) => (
                <DidDocumentComponent
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
          <VerificationTextSpan>
            Verification <div></div>
          </VerificationTextSpan>
        )}
        <DidDocument />
        {jwsStatus === 'Verified' && (
          <StartOverIcon onClick={() => handleDelete()} src={BtnStartOver} />
        )}
      </BottomSection>
    </Container>
  )
}
