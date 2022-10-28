import React from 'react';

import * as styles from './BottomSection.module.css';

export function InfoLink() {
  return (
    <div className={styles.infoLink}>
      <span className={styles.infoItem}>
        Don’t have an on-chain DID yet?{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.trusted-entity.io/assets/pdf/Upgrading-to-on-chain-DID.pdf"
        >
          Read here
        </a>
      </span>
      <span className={styles.infoItem}>
        Don’t have a web3name yet?{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.trusted-entity.io/assets/pdf/How_To_Guide_web3name_link_address_Full_May22.pdf"
        >
          Read here
        </a>
      </span>
    </div>
  );
}
