import { NavLink } from 'react-router-dom';

import * as styles from './Header.module.css';

import { paths } from '../../Utils/paths';

export function Header() {
  return (
    <header className={styles.header}>
      <PrimaryHeader />
      <SecondaryHeader />
    </header>
  );
}

function PrimaryHeader() {
  return (
    <div className={styles.primaryHeader}>
      <div className={styles.logoContainer}>
        <NavLink to={paths.signer} className={styles.headerLogoBtn} />
      </div>
    </div>
  );
}

function SecondaryHeader() {
  return (
    <div className={styles.secondaryHeader}>
      <span className={styles.text}>
        Documents that build trust - securely signed with your decentralized
        identifier (DID).
      </span>
    </div>
  );
}
