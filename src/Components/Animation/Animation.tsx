import * as styles from './Animation.module.css';

export function SlowAnimation() {
  return (
    <div className={styles.containerSlow}>
      <div className={styles.gradient} />
      <div className={styles.circle2} />
    </div>
  );
}

export function SlowAnimationVerifier() {
  return (
    <div className={styles.containerVerifier}>
      <div className={styles.gradient} />
      <div className={styles.circle2} />
    </div>
  );
}

export function FastAnimation() {
  return (
    <div className={styles.containerFast}>
      <div className={styles.gradient} />
      <div className={styles.circle2} />
      <div className={styles.circle3} />
      <div className={styles.circle4} />
      <div className={styles.circle5} />
    </div>
  );
}
