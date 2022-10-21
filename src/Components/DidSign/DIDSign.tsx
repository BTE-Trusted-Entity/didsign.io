import React from 'react';

import * as styles from './DidSign.module.css';

import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { useShowPopup } from '../Popups/Popups';

export const DIDSign = () => {
  const popupVisible = useShowPopup().visible;

  return (
    <div className={styles.body}>
      {popupVisible && <div className={styles.darkOverlay} />}
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
