import React from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import classnames from 'classnames';

import styles from './Header.module.css';

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
        <button
          aria-label="reload page"
          className={styles.headerLogoBtn}
          onClick={() => window.location.reload()}
        />
      </div>
    </div>
  );
};

const SecondaryHeader = () => {
  const location = useLocation();
  return (
    <div className={styles.secondaryHeader}>
      <span className={styles.text}>
        Documents that build trust - securely signed with your decentralized
        identifier (DID).
      </span>
      <nav className={styles.navbar}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.navlinkActive : styles.navlink
          }
          to={paths.signer}
        >
          <span>SIGN</span>
          <div
            className={classnames(
              styles.signUnderline,
              location.pathname === paths.signer && styles.activeUnderline,
            )}
          />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.navlinkActive : styles.navlink
          }
          to={paths.verifier}
        >
          <span>Verify</span>

          <div
            className={classnames(
              styles.verifyUnderline,
              location.pathname === paths.verifier && styles.activeUnderline,
            )}
          />
        </NavLink>
      </nav>
    </div>
  );
};
