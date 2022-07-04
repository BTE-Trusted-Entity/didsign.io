import React from 'react';

import styles from './ReadHere.module.css';

export const ReadHere = () => {
  return (
    <section className={styles.container}>
      <div className={styles.section}>
        <span className={styles.infoItem}>
          Don&apos;t have an on-chain DID yet?{' '}
          <a
            target="_blank"
            rel="noreferrer"
            className="hover:underline text-medium-blue"
            href="https://www.trusted-entity.io/assets/pdf/Upgrading-to-on-chain-DID.pdf"
          >
            Read here
          </a>
        </span>
        <span className={styles.infoItem}> | </span>
        <span className={styles.infoItem}>
          Don&apos;t have a web3name yet?{' '}
          <a
            target="_blank"
            rel="noreferrer"
            className="hover:underline text-medium-blue"
            href="https://www.trusted-entity.io/assets/pdf/How_To_Guide_web3name_link_address_Full_May22.pdf"
          >
            Read here
          </a>
        </span>
      </div>
    </section>
  );
};
