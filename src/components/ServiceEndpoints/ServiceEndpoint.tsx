import type {
  Did,
  ICredential,
  KiltPublishedCredentialCollectionV1,
  KiltPublishedCredentialV1,
} from '@kiltprotocol/types';

import { Credential } from '@kiltprotocol/legacy-credentials';

import { Fragment, useCallback, useState } from 'react';
import classnames from 'classnames';

import { every, map } from 'lodash-es';

import * as styles from './ServiceEndpoint.module.css';

import { CredentialVerifier } from '../Credential/Credential';
import { useBooleanState } from '../../hooks/useBooleanState';

function isLegacyCredential(credential: unknown): credential is {
  request: ICredential;
} {
  return (
    typeof credential === 'object' &&
    credential !== null &&
    'request' in credential
  );
}

function isPublishedCollection(
  json: unknown,
): json is KiltPublishedCredentialCollectionV1 {
  if (!Array.isArray(json)) {
    return false;
  }

  if (json.length === 0) {
    return false;
  }

  const credentials = map(
    json as KiltPublishedCredentialCollectionV1,
    'credential',
  );
  return every(credentials, Credential.isICredential);
}

interface Props {
  url: string;
  endpointType: string;
  did: Did;
}

export function ServiceEndpoint({ url, endpointType, did }: Props) {
  const [credentials, setCredentials] = useState<KiltPublishedCredentialV1[]>();

  const fetching = useBooleanState();
  const fetched = useBooleanState();
  const error = useBooleanState();

  const handleClose = useCallback(() => {
    error.off();
    fetched.off();
    setCredentials(undefined);
  }, [error, fetched]);

  const handleFetch = useCallback(async () => {
    try {
      fetching.on();
      const response = await fetch(url);
      const json = await response.json();

      if (isPublishedCollection(json)) {
        setCredentials(json);
        return;
      }

      if (Credential.isICredential(json)) {
        setCredentials([{ credential: json }]);
        return;
      }

      if (isLegacyCredential(json)) {
        setCredentials([{ credential: json.request }]);
        return;
      }

      throw new Error('No Kilt credentials found');
    } catch {
      error.on();
    } finally {
      fetching.off();
      fetched.on();
    }
  }, [fetched, fetching, url, error]);

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
          onClick={fetched.current ? handleClose : handleFetch}
        >
          <span>{fetched.current ? 'Close' : 'Fetch'}</span>
        </button>
      </div>

      <span className={styles.endpoint}>{url}</span>

      {error.current && (
        <div className={styles.error}>
          <CredentialVerifier
            did={did}
            initialError="Cannot fetch the credentials from the given endpoint"
          />
        </div>
      )}

      {credentials && !error.current && (
        <Fragment>
          <ul className={styles.credentials}>
            {credentials.map((credential) => (
              <li
                key={credential.credential.rootHash}
                className={styles.credential}
              >
                <CredentialVerifier did={did} credentialV1={credential} />
              </li>
            ))}
          </ul>
          {credentials.length > 1 && (
            <button onClick={handleClose} className={styles.collapse}>
              collapse
            </button>
          )}
        </Fragment>
      )}
    </div>
  );
}
