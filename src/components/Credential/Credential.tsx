import { Fragment, useEffect, useState } from 'react';
import {
  Did,
  DidUri,
  Credential,
  KiltPublishedCredentialV1,
  CType,
  Attestation,
} from '@kiltprotocol/sdk-js';

import * as styles from './Credential.module.css';

import { apiPromise } from '../../utils/api';

function useChainData(credentialV1?: KiltPublishedCredentialV1) {
  const [label, setLabel] = useState(credentialV1?.metadata?.label);
  const [attester, setAttester] = useState<string | DidUri>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (label || !credentialV1) {
      return;
    }

    const { credential } = credentialV1;

    (async () => {
      try {
        const { title } = await CType.fetchFromChain(
          CType.hashToId(credential.claim.cTypeHash),
        );
        setLabel(title);
      } catch {
        // no error, credential can still be verified
      }
    })();
  }, [label, credentialV1]);

  useEffect(() => {
    if (!credentialV1) {
      return;
    }
    const { credential } = credentialV1;

    (async () => {
      const api = await apiPromise;
      const attestationChain = await api.query.attestation.attestations(
        credential.rootHash,
      );

      if (attestationChain.isNone) {
        setError('No Attestation found for credential');
        return;
      }
      const attestation = Attestation.fromChain(
        attestationChain,
        credential.rootHash,
      );

      const didChain = await api.call.did.query(Did.toChain(attestation.owner));
      if (didChain.isNone) {
        setError('Unable to fetch attester details');
        return;
      }
      const { web3Name } = Did.linkedInfoFromChain(didChain);
      setAttester(web3Name ? `w3n:${web3Name}` : attestation.owner);

      if (attestation.revoked) {
        setError('Credential attestation revoked');
        return;
      }
    })();
  }, [credentialV1]);

  return { label, attester, error };
}

function useVerify(did: DidUri, credentialV1?: KiltPublishedCredentialV1) {
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!credentialV1) {
      return;
    }
    const { credential } = credentialV1;

    (async () => {
      if (!Did.isSameSubject(credential.claim.owner, did)) {
        setError('Credential subject and signer DID are not the same');
        return;
      }

      try {
        await Credential.verifyCredential(credential);
      } catch {
        setError('Not a valid Kilt Credential');
      }
    })();
  }, [credentialV1, did]);

  return { error };
}

interface Props {
  did: DidUri;

  credentialV1?: KiltPublishedCredentialV1;
  initialError?: string;
}

export function CredentialVerifier({ credentialV1, did, initialError }: Props) {
  const { label, attester, error: chainError } = useChainData(credentialV1);
  const { error: verifyError } = useVerify(did, credentialV1);

  const error = [initialError, chainError, verifyError].filter(Boolean)[0];

  return (
    <Fragment>
      {label && <h2 className={styles.heading}>{label}</h2>}

      {credentialV1 &&
        Object.entries(credentialV1.credential.claim.contents).map(
          ([name, value]) => (
            <div className={styles.property} key={name}>
              <span className={styles.name}>{name}</span>
              <span className={styles.value}>{String(value)}</span>
            </div>
          ),
        )}

      {error && (
        <div className={styles.property}>
          <span className={styles.name}>Error</span>
          <span className={styles.value}>{error}</span>
        </div>
      )}

      {!error && (
        <div className={styles.property}>
          <span className={styles.name}>Attester</span>
          <span className={styles.value}>
            {attester && !attester.startsWith('w3n:') && attester}

            {attester && attester.startsWith('w3n:') && (
              <a
                className={styles.anchor}
                href={`https://w3n.id/${attester.replace('w3n:', '')}`}
                target="_blank"
                rel="noreferrer"
              >
                {attester}
              </a>
            )}
          </span>
        </div>
      )}

      <div className={styles.property}>
        <span className={styles.name}>Valid</span>
        <span className={error ? styles.invalid : styles.valid}></span>
      </div>
    </Fragment>
  );
}
