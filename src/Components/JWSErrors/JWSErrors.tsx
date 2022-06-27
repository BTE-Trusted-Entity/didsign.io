import React from 'react';

import styles from './JWSErrors.module.css';

import { useAppSelector } from '../../app/hooks';
import { selectJwsSignStatus } from '../../Features/Signer/VerifyJwsSlice';

export const JWSErrors = () => {
  const jwsStatus = useAppSelector(selectJwsSignStatus);
  if (jwsStatus === 'Multiple Sign') {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <span className={styles.verificationErrorText}>Verification</span>
      </div>

      <div className={styles.textWrapper}>
        <span className={styles.errorTitle}>Attention</span>

        {jwsStatus === 'Corrupted' && (
          <span className={styles.errorText}>
            The signature file is corrupted. Please make sure to import the
            correct signature file.
          </span>
        )}

        {jwsStatus === 'Invalid' && (
          <span className={styles.errorText}>
            The signature does not match with the imported files. Please make
            sure to import the correct files.
          </span>
        )}
      </div>
    </div>
  );
};
