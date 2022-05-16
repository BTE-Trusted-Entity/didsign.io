import React, { useState } from 'react'
import { useAppSelector } from '../app/hooks'
import { selectVerifiedDid } from '../Features/Signer/EndpointSlice'
import loader from '../ImageAssets/spinning-circles.svg'

import {
  getAttestationForRequest,
  getDidForAccount,
  getW3NOrDid,
  validateAttestation,
  validateCredential,
} from '../Utils/verify-helper'
import { Credential, RequestForAttestation, Did } from '@kiltprotocol/sdk-js'
import ChevronDown from '../ImageAssets/chevron_down_white.svg'
import ChevronUp from '../ImageAssets/chevron_up_white.svg'
import {
  EndpointsContainer,
  EndpointSpan,
  EndpointTypeContainer,
  EndpointURLSpan,
  FetchBtn,
  FetchLoader,
  Separator,
} from '../StyledComponents/DidDocument'
import { CredentialComponent } from './Credential'

interface Props {
  url: string
  endpointType: string
}

export const DidDocumentComponent = ({ url, endpointType }: Props) => {
  const did = useAppSelector(selectVerifiedDid)
  // eslint-disable-next-line
  const [credential, setCredential] = useState<any | null>(null)
  const [isCredentialValid, setIsCredentialValid] = useState<boolean>(true)
  const [attester, setAttester] = useState('')

  const [fetching, setFetching] = useState(false)
  const [fetched, setFetched] = useState(false)

  const handleFetch = async () => {
    if (fetched) {
      setFetched(false)
      setCredential(null)
      return
    } else {
      setFetched(true)
    }
    if (credential) {
      return
    }
    setFetching(true)

    try {
      const response = await fetch(url)
      const result = await response.json()
      setCredential(result.claim.contents)

      if (!Did.DidUtils.isSameSubject(result.claim.owner, did)) {
        setIsCredentialValid(false)
        setAttester('Credential subject and signer DID are not the same')
        return
      }

      if (Credential.isICredential(result)) {
        setIsCredentialValid(await validateCredential(result))
        const attesterDid = getDidForAccount(result.attestation.owner)
        setAttester(await getW3NOrDid(attesterDid))
        return
      }

      if (!RequestForAttestation.isIRequestForAttestation(result)) {
        setIsCredentialValid(false)
        setAttester('Not valid Kilt Credential')
        return
      }

      const attestation = await getAttestationForRequest(result)
      setIsCredentialValid(await validateAttestation(attestation))
      if (attestation) {
        const attesterDid = getDidForAccount(attestation.owner)
        setAttester(await getW3NOrDid(attesterDid))
      } else {
        setAttester('No Attestation found')
      }
    } catch (error) {
      console.log(error)
      setFetched(false)
    } finally {
      setFetching(false)
    }
  }

  return (
    <EndpointsContainer>
      <EndpointTypeContainer>
        <EndpointSpan>{endpointType}</EndpointSpan>
        <FetchBtn onClick={() => handleFetch()}>
          {' '}
          {fetching && <FetchLoader />}
          <span>{fetched ? 'Close' : 'Fetch'}</span>
          <img src={fetched ? ChevronUp : ChevronDown} />
        </FetchBtn>
      </EndpointTypeContainer>
      <EndpointURLSpan>{url}</EndpointURLSpan>
      {credential && (
        <CredentialComponent
          credential={credential}
          attesterDid={attester}
          isCredentialValid={isCredentialValid}
        />
      )}
      <Separator className=" border-b-[1px] border-b-dark-purple border-dotted w-full"></Separator>
    </EndpointsContainer>
  )
}
