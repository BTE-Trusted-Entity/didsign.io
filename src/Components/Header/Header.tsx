import { NavLink } from 'react-router-dom';

import * as styles from './Header.module.css';

import { paths } from '../../Utils/paths';

export const Header = () => {
  return (
    <header className={styles.header}>
      <PrimaryHeader />
      <SecondaryHeader />
    </header>
  );
};
const PrimaryHeader = () => {
  return (
    <div className={styles.primaryHeader}>
      <div className={styles.logoContainer}>
        <NavLink to={paths.signer} className={styles.headerLogoBtn} />
      </div>
    </div>
  );
};

const SecondaryHeader = () => {
  return (
    <div className={styles.secondaryHeader}>
      <span className={styles.text}>
        Documents that build trust - securely signed with your decentralized
        identifier (DID).
      </span>
    </div>
  );
};
