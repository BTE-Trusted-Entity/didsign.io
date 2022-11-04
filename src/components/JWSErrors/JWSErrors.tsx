import * as styles from './JWSErrors.module.css';

import { VerificationError } from '../../utils/types';

export function JWSErrors({ error }: { error: VerificationError }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.verificationText}>Verification</span>
      </div>

      <div className={styles.wrapper}>
        <span className={styles.title}>Attention</span>

        {error === 'Corrupted' && (
          <span className={styles.text}>
            The signature file is corrupted. Please make sure to import the
            correct signature file.
          </span>
        )}

        {error === 'Invalid' && (
          <span className={styles.text}>
            The signature does not match with the imported files. Please make
            sure to import the correct files.
          </span>
        )}
      </div>
    </div>
  );
}
