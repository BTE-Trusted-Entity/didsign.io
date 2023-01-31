import {
  Credential,
  DidUri,
  ICredential,
  KiltPublishedCredentialCollectionV1,
  KiltPublishedCredentialCollectionV1Type,
} from '@kiltprotocol/sdk-js';

import { Fragment, useCallback, useState } from 'react';
import classnames from 'classnames';

import { map } from 'lodash-es';

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
  endpointType: string,
): json is KiltPublishedCredentialCollectionV1 {
  if (endpointType !== KiltPublishedCredentialCollectionV1Type) {
    return false;
  }
  if (!Array.isArray(json)) {
    return false;
  }
  const [{ credential }] = json as KiltPublishedCredentialCollectionV1;
  return Credential.isICredential(credential);
}

interface Props {
  url: string;
  endpointType: string;
  did: DidUri;
}

export function ServiceEndpoint({ url, endpointType, did }: Props) {
  const [credentials, setCredentials] = useState<ICredential[]>();

  const fetched = Boolean(credentials);

  const fetching = useBooleanState();
  const error = useBooleanState();

  const handleClose = useCallback(() => {
    error.off();
    setCredentials(undefined);
  }, [error]);

  const handleFetch = useCallback(async () => {
    try {
      fetching.on();
      const response = await fetch(url);
      const json = await response.json();

      if (isLegacyCredential(json)) {
        setCredentials([json.request]);
        return;
      }

      if (Credential.isICredential(json)) {
        setCredentials([json]);
        return;
      }

      if (isPublishedCollection(json, endpointType)) {
        setCredentials(map(json, 'credential'));
        return;
      }

      error.on();
    } catch {
      error.on();
    } finally {
      fetching.off();
    }
  }, [fetching, url, endpointType, error]);

  return (
    <div className={styles.container}>
      <div className={styles.endpointTypeContainer}>
        <span className={styles.endpoint}>{endpointType}</span>

        <button
          className={classnames({
            [styles.closeButton]: fetched,
            [styles.fetchButton]: !fetched,
            [styles.loader]: fetching.current,
          })}
          onClick={fetched ? handleClose : handleFetch}
        >
          <span>{fetched ? 'Close' : 'Fetch'}</span>
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
              <li key={credential.rootHash} className={styles.credential}>
                <CredentialVerifier did={did} credential={credential} />
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
