import React, { useCallback, useEffect, useState } from 'react';

import classnames from 'classnames';

import {
  Did,
  DidUri,
  IClaimContents,
  Credential,
  RequestForAttestation,
} from '@kiltprotocol/sdk-js';

import styles from './Credential.module.css';

import {
  getAttestationForRequest,
  getW3NOrDid,
  validateAttestation,
  validateCredential,
} from '../../Utils/verify-helper';

interface IDIDCredential {
  credential: RequestForAttestation;
  didUri: DidUri | undefined;
}

export function CredentialComponent({ credential, didUri }: IDIDCredential) {
  const [claimContents, setClaimContents] = useState<IClaimContents | null>(
    null,
  );
  const [isCredentialValid, setIsCredentialValid] = useState<boolean>(true);
  const [attester, setAttester] = useState<string>('');
  const [error, setError] = useState<string>();

  const verifyCredentialContents = useCallback(
    async (credential: RequestForAttestation, didUri: DidUri) => {
      setClaimContents(credential.claim.contents);
      if (!Did.Utils.isSameSubject(credential.claim.owner, didUri)) {
        setIsCredentialValid(false);
        setError('Credential subject and signer DID are not the same');
        return;
      }

      if (Credential.isICredential(credential)) {
        setIsCredentialValid(await validateCredential(credential));
        const attesterDid = credential.attestation.owner;
        setAttester(await getW3NOrDid(attesterDid));
        return;
      }

      if (!RequestForAttestation.isIRequestForAttestation(credential)) {
        setIsCredentialValid(false);
        setError('Not valid Kilt Credential');
        return;
      }

      const attestation = await getAttestationForRequest(credential);
      setIsCredentialValid(await validateAttestation(attestation));

      if (attestation) {
        setAttester(await getW3NOrDid(attestation.owner));
      } else {
        setError('No Attestation found');
      }
    },
    [],
  );

  useEffect(() => {
    if (credential && didUri) {
      verifyCredentialContents(credential, didUri);
    }
  }, [credential, didUri, verifyCredentialContents]);
  return (
    <div className={styles.credential}>
      {isCredentialValid &&
        claimContents &&
        Object.keys(claimContents).map((key, index) => (
          <div className={styles.property} key={index}>
            <span className={styles.name}>{key}</span>
            <span className={styles.value}>{claimContents[key]}</span>
          </div>
        ))}

      <div className={styles.property}>
        <span className={styles.name}>{error ? 'Error' : 'Attester'}</span>
        <span className={styles.value}>{error ? error : attester}</span>
      </div>

      <div className={styles.property}>
        <span className={styles.name}>Valid</span>
        {
          <span
            className={classnames(
              isCredentialValid
                ? styles.credentialValid
                : styles.credentialInvalid,
            )}
          ></span>
        }
      </div>
    </div>
  );
}
