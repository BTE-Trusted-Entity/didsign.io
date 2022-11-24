import { useEffect, useState } from 'react';
import {
  Did,
  DidUri,
  IClaimContents,
  Credential,
  ICredential,
  KiltPublishedCredentialCollectionV1,
  KiltPublishedCredentialCollectionV1Type,
} from '@kiltprotocol/sdk-js';

import * as styles from './Credential.module.css';

import {
  getAttestationForRequest,
  getW3NOrDid,
  validateAttestation,
} from '../../utils/verify-helper';
import { useBooleanState } from '../../hooks/useBooleanState';

interface IDIDCredential {
  credential: unknown;
  endpointType?: string;
  did?: DidUri;
  initialError?: string;
}

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

export function CredentialVerifier({
  credential,
  endpointType,
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

      let kiltCredential: ICredential | undefined;

      if (isLegacyCredential(credential)) {
        kiltCredential = credential.request;
      }

      if (Credential.isICredential(credential)) {
        kiltCredential = credential;
      }

      if (endpointType && isPublishedCollection(credential, endpointType)) {
        kiltCredential = credential[0].credential;
      }

      if (!kiltCredential) {
        isValid.off();
        setError('Not a valid Kilt Credential');
        return;
      }

      setClaimContents(kiltCredential.claim.contents);

      if (!Did.isSameSubject(kiltCredential.claim.owner, did)) {
        isValid.off();
        setError('Credential subject and signer DID are not the same');
        return;
      }

      try {
        await Credential.verifyCredential(kiltCredential);
      } catch {
        isValid.off();
        setError('Not a valid Kilt Credential');
        return;
      }

      const attestation = await getAttestationForRequest(kiltCredential);

      if (await validateAttestation(attestation)) {
        setAttester(await getW3NOrDid(attestation.owner));
        isValid.on();
      } else {
        isValid.off();
        setError('Attestation missing or revoked');
      }
    })();
  }, [credential, did, error, isValid, endpointType]);

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
