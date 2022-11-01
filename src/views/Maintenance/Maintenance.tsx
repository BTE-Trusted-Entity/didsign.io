import * as styles from './Maintenance.module.css';

export function Maintenance() {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h1 className={styles.heading}>Currently under maintenance</h1>
        <p className={styles.text}>
          DIDsign is under maintenance for a short time, as KILT migrates from
          Kusama to Polkadot.
        </p>
        <a
          className={styles.anchor}
          href="https://status.kilt.io/"
          target="_blank"
          rel="noreferrer"
        >
          Please check our status page for updates.
        </a>
      </div>
    </div>
  );
}
