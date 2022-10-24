import React, { useState } from 'react';

import classnames from 'classnames';

import * as styles from './ServiceEndpoint.module.css';

import { useVerifiedSignature } from '../VerifiedSignature/VerifiedSignature';

import { CredentialVerifier } from '../Credential/Credential';

interface Props {
  url: string;
  endpointType: string;
}

export const ServiceEndpoint = ({ url, endpointType }: Props) => {
  const { did } = useVerifiedSignature();

  const [credential, setCredential] = useState();

  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleFetch = async () => {
    if (fetched) {
      setFetched(false);
      setCredential(undefined);
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

      if (!did) {
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

      {credential && <CredentialVerifier credential={credential} did={did} />}
    </div>
  );
};
