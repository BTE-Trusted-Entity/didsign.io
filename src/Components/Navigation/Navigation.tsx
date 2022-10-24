import { useCallback, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import classnames from 'classnames';

import * as styles from './Navigation.module.css';

import { useSignature } from '../Signature/Signature';
import { paths } from '../../Utils/paths';
import { TimestampWarning, useShowPopup } from '../Popups/Popups';

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const { downloaded: signatureDownloaded, timestamped: isTimestamped } =
    useSignature();
  const showPopup = useShowPopup().set;

  const handleVerify = useCallback(() => {
    if (isTimestamped && !signatureDownloaded) {
      showPopup(true);
      setShowWarningPopup(true);
      return;
    }

    navigate(paths.verifier, { replace: true });
  }, [isTimestamped, navigate, showPopup, signatureDownloaded]);

  const handleDismiss = useCallback(() => {
    showPopup(false);
    setShowWarningPopup(false);
  }, [showPopup]);

  const handleOkay = useCallback(() => {
    showPopup(false);
    setShowWarningPopup(false);
    navigate(paths.verifier, { replace: true });
  }, [navigate, showPopup]);

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
