import React, { Fragment } from 'react'

import { useAppSelector } from '../app/hooks'
import {
  selectServiceEndpoints,
  selectTimestamp,
  selectTxHash,
  selectVerifiedDid,
  selectVerifiedSign,
  selectW3Name,
} from '../Features/Signer/EndpointSlice'
import { selectJwsSignStatus } from '../Features/Signer/VerifyJwsSlice'
import { JWSErrors } from './JWSErrors'
import { ServiceEndpoint } from './ServiceEndpoint'
import OkIcon from '../ImageAssets/icon_oK.svg'

import * as Styled from '../StyledComponents/DidDocument'
import { useSubscanHost } from '../Utils/useSubscanHost'

export const DidDocument = () => {
  const sign = useAppSelector(selectVerifiedSign)
  const did = useAppSelector(selectVerifiedDid)
  const w3name = useAppSelector(selectW3Name)
  const timestamp = useAppSelector(selectTimestamp) || 'No timestamp available'
  const txHash = useAppSelector(selectTxHash)

  const seviceEndpoints = useAppSelector(selectServiceEndpoints)
  const jwsStatus = useAppSelector(selectJwsSignStatus)
  const subscanHost = useSubscanHost()

  if (jwsStatus === 'Not Checked' || jwsStatus === 'Validating') return null

  if (jwsStatus !== 'Verified') {
    return <JWSErrors />
  } else {
    return (
      <Styled.Container>
        <Styled.TextWrapper>
          <Styled.VerificationText>Verification</Styled.VerificationText>
          <Styled.VerificationIcon>
            <img src={OkIcon} />
          </Styled.VerificationIcon>
        </Styled.TextWrapper>

        <Styled.TextWrapper>
          <Styled.Title>Signed By</Styled.Title>
          <Styled.Text>
            {w3name && (
              <Fragment>
                w3n:{w3name}
                <br />
              </Fragment>
            )}
            {did}
          </Styled.Text>
        </Styled.TextWrapper>
        <Styled.TextWrapper>
          <Styled.Title>Signed At</Styled.Title>
          <Styled.Text>
            {timestamp}
            <a
              href={`${subscanHost}/extrinsic/${txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              Subscan
            </a>
          </Styled.Text>
        </Styled.TextWrapper>

        <Styled.TextWrapper>
          <Styled.Title>Signature</Styled.Title>
          <Styled.Text>{sign}</Styled.Text>
        </Styled.TextWrapper>

        <Styled.TextWrapper>
          <Styled.Title>Service Endpoints</Styled.Title>
          <Styled.EndpointsWrapper>
            {seviceEndpoints.map((endpoint) => (
              <ServiceEndpoint
                url={endpoint.urls[0]}
                endpointType={endpoint.types[0]}
                key={endpoint.id}
              />
            ))}
          </Styled.EndpointsWrapper>
        </Styled.TextWrapper>
      </Styled.Container>
    )
  }
}
