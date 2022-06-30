import React, { useState } from 'react';

import { RequestForAttestation } from '@kiltprotocol/sdk-js';

import classnames from 'classnames';

import styles from './ServiceEndpoint.module.css';

import { useAppSelector } from '../../app/hooks';
import { selectVerifiedDid } from '../../Features/Signer/VerifiedSignatureSlice';

import { CredentialComponent } from '../Credential/Credential';

interface Props {
  url: string;
  endpointType: string;
}

export const ServiceEndpoint = ({ url, endpointType }: Props) => {
  const didUri = useAppSelector(selectVerifiedDid);

  const [credential, setCredential] = useState<RequestForAttestation | null>(
    null,
  );

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
      setCredential(result);

      if (!didUri) {
        throw new Error('No DID');
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
      </div>

      <span className={styles.endpoint}>{url}</span>

      {credential && (
        <CredentialComponent credential={credential} didUri={didUri} />
      )}
    </div>
  );
};
