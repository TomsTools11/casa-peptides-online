'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.headerBrand}>
          <Image
            src="/images/logos/cplogo.png"
            alt="Casa Labs"
            width={88}
            height={44}
            className={styles.headerLogo}
            priority
          />
        </Link>
        <nav className={styles.headerNav}>
          <Link href="/" className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}>Home</Link>
          <Link href="/catalog" className={`${styles.navLink} ${isActive('/catalog') ? styles.navLinkActive : ''}`}>Full Catalogue</Link>
          <Link href="/blog" className={`${styles.navLink} ${isActive('/blog') ? styles.navLinkActive : ''}`}>Blog</Link>
        </nav>
      </div>
    </div>
  );
}
