import * as styles from './Imprint.module.css';

export const Imprint = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Imprint</h1>
        <section className={styles.imprintSection}>
          <p className={styles.imprintLine}>
            B.T.E. BOTLabs Trusted Entity GmbH
          </p>
          <p className={styles.imprintLine}>Keithstraße 2-4</p>
          <p className={styles.imprintLine}>10787 Berlin, Germany</p>
        </section>

        <section className={styles.imprintSection}>
          <p className={styles.imprintLine}>German Commercial Court:</p>
          <p className={styles.imprintLine}>
            Amtsgericht Charlottenburg in Berlin
          </p>
          <p className={styles.imprintLine}>Registration Number: HRB 231219B</p>
          <p className={styles.imprintLine}>VAT No: DE 346528612</p>
          <p className={styles.imprintLine}>Managing Director: Ingo Rübe</p>
        </section>

        <section className={styles.imprintSection}>
          <p className={styles.imprintLine}>
            Contact:{' '}
            <a className={styles.anchor} href="mailto:info@botlabs.org">
              info@botlabs.org
            </a>
          </p>
          <p className={styles.imprintLine}>
            Or go to{' '}
            <a
              className={styles.anchor}
              href="https://support.kilt.io/support/home"
              target="_blank"
              rel="noreferrer"
            >
              Tech support
            </a>{' '}
            {`and click on "Contact Us"`}
          </p>
        </section>

        <p className={styles.imprintSection}>
          Requirements according to § 5 TMG (Germany)
        </p>
      </div>
    </main>
  );
};
