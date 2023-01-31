import { Fragment, useEffect, useState } from 'react';
import {
  Did,
  DidUri,
  IClaimContents,
  Credential,
  ICredential,
} from '@kiltprotocol/sdk-js';

import * as styles from './Credential.module.css';

import {
  getAttestationForRequest,
  getW3NOrDid,
  validateAttestation,
} from '../../utils/verify-helper';
import { useBooleanState } from '../../hooks/useBooleanState';

interface Props {
  did: DidUri;

  credential?: ICredential;
  initialError?: string;
}

export function CredentialVerifier({ credential, did, initialError }: Props) {
  const [claimContents, setClaimContents] = useState<IClaimContents>();
  const isValid = useBooleanState(!initialError);
  const [attester, setAttester] = useState('');
  const [error, setError] = useState(initialError);

  useEffect(() => {
    (async () => {
      if (error || !credential) return;

      setClaimContents(credential.claim.contents);

      if (!Did.isSameSubject(credential.claim.owner, did)) {
        isValid.off();
        setError('Credential subject and signer DID are not the same');
        return;
      }

      try {
        await Credential.verifyCredential(credential);
      } catch {
        isValid.off();
        setError('Not a valid Kilt Credential');
        return;
      }

      const attestation = await getAttestationForRequest(credential);

      if (await validateAttestation(attestation)) {
        setAttester(await getW3NOrDid(attestation.owner));
        isValid.on();
      } else {
        isValid.off();
        setError('Attestation missing or revoked');
      }
    })();
  }, [credential, did, error, isValid]);

  return (
    <Fragment>
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
    </Fragment>
  );
}
