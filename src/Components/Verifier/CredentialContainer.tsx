import React, { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectVerifiedDid } from '../../Features/Signer/EndpointSlice'
import loader from '../../ImageAssets/spinning-circles.svg'

import {
  getAttestationForRequest,
  getDidForAccount,
  validateAttestation,
  validateCredential,
} from '../../Utils/verify-helper'
import { Credential, RequestForAttestation, Did } from '@kiltprotocol/sdk-js'
import { Credential as CredentialComponent } from './Credential'
import ChevronDown from '../../ImageAssets/chevron_down_white.svg'
import ChevronUp from '../../ImageAssets/chevron_up_white.svg'
import {
  EndpointsContainer,
  EndpointSpan,
  EndpointTypeContainer,
  EndpointURLSpan,
  FetchBtn,
  Separator,
} from '../../StyledComponents/DidDocument'

interface Props {
  url: string
  endpointType: string
}
export const CredentialContainer = ({ url, endpointType }: Props) => {
  const did = useAppSelector(selectVerifiedDid)
  // eslint-disable-next-line
  const [credential, setCredential] = useState<any | null>(null)
  const [isCredentialValid, setIsCredentialValid] = useState<boolean>(true)
  const [attester, setAttester] = useState('')

  const [fetching, setFetching] = useState(false)
  const [fetched, setFetched] = useState(false)

  const handleFetch = () => {
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

    fetch(url)
      .then((response) => response.json())
      .then(async (result) => {
        if (!Did.DidUtils.isSameSubject(result.claim.owner, did)) {
          setIsCredentialValid(false)
          setAttester('Credential subject and signer DID are not the same')
        } else if (Credential.isICredential(result)) {
          setIsCredentialValid(await validateCredential(result))
          setAttester(getDidForAccount(result.attestation.owner))
        } else if (RequestForAttestation.isIRequestForAttestation(result)) {
          const attestation = await getAttestationForRequest(result)
          setIsCredentialValid(await validateAttestation(attestation))
          if (attestation) {
            setAttester(getDidForAccount(attestation.owner))
          } else {
            setAttester('No Attestation found')
          }
        }

        setCredential(result.claim.contents)
        setFetching(false)
      })
      .catch((error) => {
        console.log(error)
        setFetched(false)
        setFetching(false)
      })
  }

  return (
    <EndpointsContainer>
      <EndpointTypeContainer>
        <EndpointSpan>{endpointType}</EndpointSpan>
        <FetchBtn onClick={() => handleFetch()}>
          {' '}
          {fetching && <img className={`absolute left-2 h-2/3`} src={loader} />}
          <span>{fetched ? 'Close' : 'Fetch'}</span>
          <img
            className="absolute right-4 top-2"
            src={fetched ? ChevronUp : ChevronDown}
          />
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
