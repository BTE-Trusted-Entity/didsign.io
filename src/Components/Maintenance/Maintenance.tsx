import * as styles from './Maintenance.module.css';

export function Maintenance() {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h1 className={styles.heading}>We’ll be back soon</h1>
        <p className={styles.text}>
          Sorry for the inconvenience but we’re performing some maintenance at
          the moment.
        </p>
        <a
          className={styles.anchor}
          href="https://status.kilt.io/"
          target="_blank"
          rel="noreferrer"
        >
          Please check here for more info
        </a>
      </div>
    </div>
  );
}
