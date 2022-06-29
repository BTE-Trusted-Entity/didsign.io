import React, { useState } from 'react';

import { Credential, RequestForAttestation, Did } from '@kiltprotocol/sdk-js';

import classnames from 'classnames';

import styles from './ServiceEndpoint.module.css';

import { useAppSelector } from '../../app/hooks';
import { selectVerifiedDid } from '../../Features/Signer/EndpointSlice';

import {
  getAttestationForRequest,
  getW3NOrDid,
  validateAttestation,
  validateCredential,
} from '../../Utils/verify-helper';
import { CredentialComponent } from '../Credential/Credential';

interface Props {
  url: string;
  endpointType: string;
}

export const ServiceEndpoint = ({ url, endpointType }: Props) => {
  const did = useAppSelector(selectVerifiedDid);
  // eslint-disable-next-line
  const [credential, setCredential] = useState<any | null>(null);
  const [isCredentialValid, setIsCredentialValid] = useState<boolean>(true);
  const [attester, setAttester] = useState('');

  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleFetch = async () => {
    if (fetched) {
      setFetched(false);
      setCredential(null);
      return;
    } else {
      setFetched(true);
    }
    if (credential) {
      return;
    }
    setFetching(true);

    try {
      const response = await fetch(url);
      const result = await response.json();
      setCredential(result.claim.contents);

      if (!did) {
        throw new Error('No DID');
      }

      if (!Did.Utils.isSameSubject(result.claim.owner, did)) {
        setIsCredentialValid(false);
        setAttester('Credential subject and signer DID are not the same');
        return;
      }

      if (Credential.isICredential(result)) {
        setIsCredentialValid(await validateCredential(result));
        const attesterDid = result.attestation.owner;
        setAttester(await getW3NOrDid(attesterDid));
        return;
      }

      if (!RequestForAttestation.isIRequestForAttestation(result)) {
        setIsCredentialValid(false);
        setAttester('Not valid Kilt Credential');
        return;
      }

      const attestation = await getAttestationForRequest(result);
      setIsCredentialValid(await validateAttestation(attestation));
      if (attestation) {
        setAttester(await getW3NOrDid(attestation.owner));
      } else {
        setAttester('No Attestation found');
      }
    } catch (error) {
      console.log(error);
      setFetched(false);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.endpointTypeContainer}>
        <span className={styles.endpoint}>{endpointType}</span>

        <button
          className={classnames(
            fetched ? styles.closeBtn : styles.fetchBtn,
            fetching && styles.loader,
          )}
          onClick={() => handleFetch()}
        >
          <span>{fetched ? 'Close' : 'Fetch'}</span>
        </button>
        <span className={styles.spinner}></span>
      </div>

      <span className={styles.endpoint}>{url}</span>

      {credential && (
        <CredentialComponent
          credential={credential}
          attesterDid={attester}
          isCredentialValid={isCredentialValid}
        />
      )}

      <div className={styles.separator} />
    </div>
  );
};
