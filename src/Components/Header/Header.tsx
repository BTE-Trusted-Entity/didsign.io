import React, { useCallback, useState } from 'react';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import classnames from 'classnames';

import styles from './Header.module.css';

import { paths } from '../../Utils/paths';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectDownloadStatus,
  selectTimestampStatus,
} from '../../Features/Signer/SignatureSlice';

import { TimestampWarning } from '../Popups/Popups';
import { showPopup } from '../../Features/Signer/PopupSlice';

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const isTimestamped = useAppSelector(selectTimestampStatus);
  const signatureDownloaded = useAppSelector(selectDownloadStatus);

  const handleVerify = useCallback(() => {
    if (isTimestamped && !signatureDownloaded) {
      dispatch(showPopup(true));
      setShowWarningPopup(true);
      return;
    }

    navigate(paths.verifier, { replace: true });
  }, [dispatch, isTimestamped, navigate, signatureDownloaded]);

  const handleDismiss = useCallback(() => {
    dispatch(showPopup(false));
    setShowWarningPopup(false);
  }, [dispatch]);

  const handleOkay = useCallback(() => {
    dispatch(showPopup(false));
    setShowWarningPopup(false);
    navigate(paths.verifier, { replace: true });
  }, [dispatch, navigate]);

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
        <a
          className={
            location.pathname === paths.verifier
              ? styles.navlinkActive
              : styles.navlink
          }
          onClick={handleVerify}
        >
          <span>Verify</span>

          <div
            className={classnames(
              styles.verifyUnderline,
              location.pathname === paths.verifier && styles.activeUnderline,
            )}
          />
        </a>
      </nav>
      {showWarningPopup && (
        <TimestampWarning onDismiss={handleDismiss} onOkay={handleOkay} />
      )}
    </div>
  );
};
