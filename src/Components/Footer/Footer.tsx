import React, { useState } from 'react';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import styles from './Footer.module.css';

import { ImprintPopup } from '../Popups/Popups';
import { useAppDispatch } from '../../app/hooks';
import { showPopup } from '../../Features/Signer/PopupSlice';
import Terms from '../../DocsAssets/Terms_of_Use_for_DIDsign_June2022.pdf';
import Privacy from '../../DocsAssets/Privacy_Policy_DIDsign_June_2022.pdf';

export const Footer = () => {
  const targetElement = document.querySelector('body');
  const [showImprint, setShowImprint] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleImprint = () => {
    dispatch(showPopup(true));
    setShowImprint(true);
    if (targetElement !== null) {
      disableBodyScroll(targetElement);
    }
  };
  const handleDismiss = () => {
    if (targetElement !== null) {
      enableBodyScroll(targetElement);
    }
    dispatch(showPopup(false));

    setShowImprint(false);
  };
  return (
    <footer className={styles.footer}>
      <nav className={styles.footerLinks}>
        <div className={styles.links}>
          <span>
            <button className={styles.imprint} onClick={handleImprint}>
              Imprint{' '}
            </button>
          </span>
          <span>-</span>
          <a href={Terms} target="_blank" rel="noreferrer">
            <span>Terms and Conditions</span>
          </a>
          <span>-</span>
          <a href={Privacy} target="_blank" rel="noreferrer">
            <span>Privacy Policy</span>
          </a>
        </div>
      </nav>

      {showImprint && <ImprintPopup onDismiss={handleDismiss} />}
    </footer>
  );
};
