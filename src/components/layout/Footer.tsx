import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Image
            src="/images/logos/cplogo.png"
            alt="Casa Labs"
            width={160}
            height={44}
            className={styles.footerLogo}
          />
          <p className={styles.brandTagline}>
            Precision peptides and research compounds for scientific study.
          </p>
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.columnHeading}>Resources</h4>
          <Link href="/store" className={styles.footerLink}>Store</Link>
          <Link href="/blog" className={styles.footerLink}>Research Articles</Link>
          <span className={styles.footerText}>COA Documentation</span>
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.columnHeading}>Company</h4>
          <span className={styles.footerText}>Privacy Policy</span>
          <span className={styles.footerText}>Terms of Service</span>
          <span className={styles.footerText}>alex@casapeptides.shop</span>
        </div>

      </div>

      <div className={styles.footerBar}>
        <p>&copy; {new Date().getFullYear()} Casa Peptides. For research purposes only.</p>
      </div>
    </footer>
  );
}
