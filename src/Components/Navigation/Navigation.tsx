import { useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import * as styles from './Navigation.module.css';

import { paths } from '../../Utils/paths';
import { TimestampWarning } from '../Popups/Popups';
import { useBooleanState } from '../../Utils/useBooleanState';

export function Navigation({ needWarning = false }: { needWarning?: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();

  const showWarningPopup = useBooleanState();

  const handleVerify = useCallback(() => {
    if (needWarning) {
      showWarningPopup.on();
      return;
    }

    navigate(paths.verifier, { replace: true });
  }, [navigate, needWarning, showWarningPopup]);

  const handleOkay = useCallback(() => {
    showWarningPopup.off();
    navigate(paths.verifier, { replace: true });
  }, [navigate, showWarningPopup]);

  return (
    <div className={styles.navContainer}>
      <nav className={styles.navbar}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
          to={paths.signer}
        >
          <span>SIGN</span>
          <div
            className={classnames({
              [styles.signUnderline]: true,
              [styles.activeUnderline]: location.pathname === paths.signer,
            })}
          />
        </NavLink>
        <a
          className={
            location.pathname === paths.verifier
              ? styles.navLinkActive
              : styles.navLink
          }
          onClick={handleVerify}
        >
          <span>Verify</span>

          <div
            className={classnames({
              [styles.verifyUnderline]: true,
              [styles.activeUnderline]: location.pathname === paths.verifier,
            })}
          />
        </a>
      </nav>

      {showWarningPopup.current && (
        <TimestampWarning
          onDismiss={showWarningPopup.off}
          onOkay={handleOkay}
        />
      )}
    </div>
  );
}
