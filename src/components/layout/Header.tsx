'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/hooks/useTheme';
import { peptides, categories } from '@/lib/products';
import styles from './Header.module.css';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/catalog" className={styles.headerBrand}>
          <Image
            src="/images/logos/casa-1.png"
            alt="Casa Peptides"
            width={88}
            height={44}
            className={`${styles.headerLogo} ${styles.headerLogoLight}`}
            priority
          />
          <Image
            src="/images/logos/casa-3.png"
            alt="Casa Peptides"
            width={88}
            height={44}
            className={`${styles.headerLogo} ${styles.headerLogoDark}`}
            priority
          />
          <span className={styles.headerSubtitle}>Product Catalog</span>
        </Link>
        <div className={styles.headerRight}>
          <div className={styles.headerStats}>
            <span>Total Products: <strong>{peptides.length}</strong></span>
            <span>Categories: <strong>{categories.length}</strong></span>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle dark mode"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </div>
  );
}
