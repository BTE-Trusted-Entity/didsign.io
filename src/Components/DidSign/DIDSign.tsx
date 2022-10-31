import * as styles from './DidSign.module.css';

import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { Backdrop } from '../Popups/Popups';

export function DIDSign() {
  return (
    <div className={styles.body}>
      <Backdrop />
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
