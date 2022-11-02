import { useEffect, useState } from 'react';
import {
  Did,
  DidUri,
  IClaimContents,
  Credential,
  RequestForAttestation,
} from '@kiltprotocol/sdk-js';

import * as styles from './Credential.module.css';

import {
  getAttestationForRequest,
  getW3NOrDid,
  validateAttestation,
  validateCredential,
} from '../../utils/verify-helper';
import { useBooleanState } from '../../hooks/useBooleanState';

interface IDIDCredential {
  credential: unknown;
  did?: DidUri;
  initialError?: string;
}

export function CredentialVerifier({
  credential,
  did,
  initialError,
}: IDIDCredential) {
  const [claimContents, setClaimContents] = useState<IClaimContents>();
  const isValid = useBooleanState(!initialError);
  const [attester, setAttester] = useState('');
  const [error, setError] = useState(initialError);

  useEffect(() => {
    (async () => {
      if (!did || error) return;

      if (Credential.isICredential(credential)) {
        setClaimContents(credential.request.claim.contents);
        isValid.set(await validateCredential(credential));
        const attesterDid = credential.attestation.owner;
        setAttester(await getW3NOrDid(attesterDid));
        return;
      }

      if (!RequestForAttestation.isIRequestForAttestation(credential)) {
        isValid.off();
        setError('Not valid Kilt Credential');
        return;
      }

      setClaimContents(credential.claim.contents);
      if (!Did.Utils.isSameSubject(credential.claim.owner, did)) {
        isValid.off();
        setError('Credential subject and signer DID are not the same');
        return;
      }

      const attestation = await getAttestationForRequest(credential);
      isValid.set(await validateAttestation(attestation));

      if (attestation) {
        setAttester(await getW3NOrDid(attestation.owner));
      } else {
        setError('No Attestation found');
      }
    })();
  }, [credential, did, error, isValid]);

  return (
    <div className={styles.credential}>
      {isValid.current &&
        claimContents &&
        Object.keys(claimContents).map((key, index) => (
          <div className={styles.property} key={index}>
            <span className={styles.name}>{key}</span>
            <span className={styles.value}>{String(claimContents[key])}</span>
          </div>
        ))}

      <div className={styles.property}>
        <span className={styles.name}>{error ? 'Error' : 'Attester'}</span>
        <span className={styles.value}>{error ? error : attester}</span>
      </div>

      <div className={styles.property}>
        <span className={styles.name}>Valid</span>
        <span
          className={isValid.current ? styles.valid : styles.invalid}
        ></span>
      </div>
    </div>
  );
}
