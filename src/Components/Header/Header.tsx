import { NavLink } from 'react-router-dom';

import * as styles from './Header.module.css';

import { paths } from '../../Utils/paths';

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.primary}>
        <div className={styles.logoContainer}>
          <NavLink to={paths.signer} className={styles.logoBtn} />
        </div>
      </div>

      <div className={styles.secondary}>
        <span className={styles.text}>
          Documents that build trust - securely signed with your decentralized
          identifier (DID).
        </span>
      </div>
    </header>
  );
}
