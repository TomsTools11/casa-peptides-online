import Link from 'next/link';
import styles from './HomeHero.module.css';

export default function HomeHero() {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <span className={styles.label}>Peptide Research Grade</span>
        <h1 className={styles.heading}>
          Advanced{'\n'}Research{'\n'}Compounds.
        </h1>
        <p className={styles.subtitle}>
          Meticulously synthesized compounds for biological
          optimization. Precision engineered for academic and clinical
          longitudinal studies.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/catalog" className={styles.cta}>
            Explore Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
