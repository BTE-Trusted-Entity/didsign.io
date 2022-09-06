import * as styles from './Maintenance.module.css';

export function Maintenance() {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h1 className={styles.heading}>
          DIDsign is currently under maintenance, as KILT migrates from Kusama
          to Polkadot.
        </h1>
        <p className={styles.text}>
          <a
            className={styles.anchor}
            href="https://status.kilt.io/"
            target="_blank"
            rel="noreferrer"
          >
            Please check our status page for updates.
          </a>
        </p>
      </div>
    </div>
  );
}
