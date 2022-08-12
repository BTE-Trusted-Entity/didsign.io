import { useCallback, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import classnames from 'classnames';

import * as styles from './Navigation.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { showPopup } from '../../Features/Signer/PopupSlice';
import {
  selectDownloadStatus,
  selectTimestampStatus,
} from '../../Features/Signer/SignatureSlice';
import { paths } from '../../Utils/paths';
import { TimestampWarning } from '../Popups/Popups';

export const Navigation = () => {
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
    <div className={styles.navContainer}>
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
