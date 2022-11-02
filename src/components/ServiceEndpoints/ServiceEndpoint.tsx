import type { DidUri } from '@kiltprotocol/sdk-js';

import { useCallback, useState } from 'react';
import classnames from 'classnames';

import * as styles from './ServiceEndpoint.module.css';

import { CredentialVerifier } from '../Credential/Credential';
import { useBooleanState } from '../../hooks/useBooleanState';

interface Props {
  url: string;
  endpointType: string;
  did: DidUri;
}

export function ServiceEndpoint({ url, endpointType, did }: Props) {
  const [credential, setCredential] = useState();

  const fetching = useBooleanState();
  const fetched = useBooleanState();
  const [error, setError] = useState<string>();

  const handleFetch = useCallback(async () => {
    if (fetched.current) {
      fetched.off();
      setCredential(undefined);
      return;
    }

    try {
      if (credential) {
        return;
      }

      fetching.on();
      const response = await fetch(url);
      const result = await response.json();
      setCredential(result);

      if (!did) {
        throw new Error('No DID');
      }
    } catch (error) {
      console.log(error);
      setError('Cannot fetch the credentials from the given endpoint');
    } finally {
      fetching.off();
      fetched.on();
    }
  }, [credential, did, fetched, fetching, url]);

  return (
    <div className={styles.container}>
      <div className={styles.endpointTypeContainer}>
        <span className={styles.endpoint}>{endpointType}</span>

        <button
          className={classnames({
            [styles.closeButton]: fetched.current,
            [styles.fetchButton]: !fetched.current,
            [styles.loader]: fetching.current,
          })}
          onClick={handleFetch}
        >
          <span>{fetched.current ? 'Close' : 'Fetch'}</span>
        </button>
      </div>

      <span className={styles.endpoint}>{url}</span>

      {fetched.current && (
        <CredentialVerifier
          credential={credential}
          did={did}
          initialError={error}
        />
      )}
    </div>
  );
}
