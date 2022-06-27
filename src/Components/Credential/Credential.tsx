import React from 'react';

import classnames from 'classnames';

import styles from './Credential.module.css';

interface IDIDCredential {
  // eslint-disable-next-line
  credential: any;
  attesterDid: string;
  isCredentialValid: boolean;
}

export const CredentialComponent = ({
  credential,
  attesterDid,
  isCredentialValid,
}: IDIDCredential) => {
  return (
    <div className={styles.credential}>
      {isCredentialValid &&
        Object.keys(credential).map((key, index) => (
          <div className={styles.property} key={index}>
            <span className={styles.name}>{key}</span>
            <span className={styles.value}>{credential[key]}</span>
          </div>
        ))}

      <div className={styles.property}>
        <span className={styles.name}>Attester</span>
        <span className={styles.value}>{attesterDid}</span>
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
};
