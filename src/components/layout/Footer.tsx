import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Image
        src="/images/logos/casa-5.png"
        alt="Casa Peptides"
        width={100}
        height={32}
        className={styles.footerLogo}
      />
      <p>Casa Peptides Product Catalog &mdash; Internal Reference &mdash; All prices per single vial &mdash; Updated March 2026</p>
    </div>
  );
}
