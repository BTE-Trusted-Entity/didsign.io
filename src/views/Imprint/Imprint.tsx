import * as styles from './Imprint.module.css';

export function Imprint() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Imprint</h1>
        <section className={styles.section}>
          <p className={styles.line}>BOTLabs GmbH</p>
          <p className={styles.line}>Keithstraße 2-4</p>
          <p className={styles.line}>10787 Berlin, Germany</p>
        </section>

        <section className={styles.section}>
          <p className={styles.line}>German Commercial Court:</p>
          <p className={styles.line}>Amtsgericht Charlottenburg in Berlin</p>
          <p className={styles.line}>Registration Number: HRB 193450B</p>
          <p className={styles.line}>VAT No: DE316284270</p>
          <p className={styles.line}>Managing Director: Ingo Rübe</p>
        </section>

        <section className={styles.section}>
          <p className={styles.line}>
            Contact:{' '}
            <a className={styles.anchor} href="mailto:info@botlabs.org">
              info@botlabs.org
            </a>
          </p>
          <p className={styles.line}>
            Or go to{' '}
            <a
              className={styles.anchor}
              href="https://support.kilt.io/support/home"
              target="_blank"
              rel="noreferrer"
            >
              Tech support
            </a>{' '}
            and click on ”Contact Us”
          </p>
        </section>

        <p className={styles.section}>
          Requirements according to § 5 TMG (Germany)
        </p>
      </div>
    </main>
  );
}
