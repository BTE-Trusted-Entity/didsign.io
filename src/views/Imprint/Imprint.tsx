import * as styles from './Imprint.module.css';

export function Imprint() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Imprint</h1>
        <section className={styles.section}>
          <p className={styles.line}>KILT Foundation</p>
          <p className={styles.line}>
            Genesis Building, 5th Floor, Genesis Close,{' '}
          </p>
          <p className={styles.line}>PO Box 446, Cayman Islands</p>
          <p className={styles.line}>KY1-1106</p>
        </section>

        <section className={styles.section}>
          <p className={styles.line}>Certificate No. 418097</p>
          <p className={styles.line}>VAT No: DE316284270</p>
          <p className={styles.line}>
            Directors: Rishant Kumar, Svetoslav Boyadzhiev
          </p>
        </section>

        <section className={styles.section}>
          <p className={styles.line}>
            Contact:{' '}
            <a className={styles.anchor} href="mailto:hello@kilt.io">
              hello@kilt.io
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
