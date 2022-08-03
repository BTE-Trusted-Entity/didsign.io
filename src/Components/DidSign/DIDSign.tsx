import React from 'react';

import styles from './DidSign.module.css';

import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { useAppSelector } from '../../app/hooks';
import { selectPopup } from '../../Features/Signer/PopupSlice';

export const DIDSign = () => {
  const popup = useAppSelector(selectPopup);

  return (
    <div className={styles.body}>
      {popup && <div className={styles.darkOverlay} />}
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
