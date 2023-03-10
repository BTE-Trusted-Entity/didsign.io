import * as styles from './BottomSection.module.css';

export function InfoLink() {
  return (
    <div className={styles.infoLink}>
      <span className={styles.infoItem}>
        Don’t have an on-chain DID yet?{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://kilt-protocol.org/files/How-to-Guide-Get-Your-DID.pdf"
        >
          Read here
        </a>
      </span>
      <span className={styles.infoItem}>
        Don’t have a web3name yet?{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://kilt-protocol.org/files/How-to-Guide-Get-Your-web3name.pdf"
        >
          Read here
        </a>
      </span>
    </div>
  );
}
