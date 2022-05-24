import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { SignButton } from './SignButton'
import { clearSign, selectSign } from '../Features/Signer/SignatureSlice'
import { DownloadButtons } from './DownloadButtons'
import {
  clearEndpoint,
  clearFileStatuses,
} from '../Features/Signer/EndpointSlice'
import {
  clearJWS,
  selectJwsSignStatus,
} from '../Features/Signer/VerifyJwsSlice'
import { clearAll, clearFileName } from '../Features/Signer/FileSlice'
import { clearHash } from '../Features/Signer/hashSlice'
import ButtonStartOver from '../ImageAssets/button_start_over_NEW.svg'
import spinner from '../ImageAssets/puff.svg'
import { selectUserRole } from '../Features/Signer/UserSlice'
import { DidDocument } from './DidDocument'

import * as Styled from '../StyledComponents/BottomSection'

const BottomSectionSigner = () => {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(clearSign())
    dispatch(clearAll())
    dispatch(clearHash())
  }
  const sign = useAppSelector(selectSign)
  return (
    <Styled.Container>
      <Styled.BottomSection>
        {!sign ? <SignButton /> : <DownloadButtons />}

        {sign && (
          <Styled.StartOverIcon
            onClick={() => handleDelete()}
            src={ButtonStartOver}
          />
        )}
      </Styled.BottomSection>
    </Styled.Container>
  )
}

const BottomSectionVerifier = () => {
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

  return (
    <Styled.Container>
      <Styled.BottomSection>
        {jwsStatus === 'Validating' && (
          <Styled.VerificationLoader src={spinner} />
        )}

        {jwsStatus === 'Not Checked' && (
          <Styled.VerificationText>
            Verification <div></div>
          </Styled.VerificationText>
        )}

        <DidDocument />

        {jwsStatus === 'Verified' && (
          <Styled.StartOverIcon
            onClick={() => handleDelete()}
            src={ButtonStartOver}
          />
        )}
      </Styled.BottomSection>
    </Styled.Container>
  )
}

export const BottomSection = () => {
  const userRoleSigner = useAppSelector(selectUserRole)
  if (userRoleSigner) return <BottomSectionSigner />
  else return <BottomSectionVerifier />
}
