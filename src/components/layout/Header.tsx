'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const { cartCount, setIsOpen } = useCart();

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
          <Link href="/store" className={`${styles.navLink} ${isActive('/store') ? styles.navLinkActive : ''}`}>Store</Link>
          <Link href="/blog" className={`${styles.navLink} ${isActive('/blog') ? styles.navLinkActive : ''}`}>Blog</Link>
          <button className={styles.cartBtn} onClick={() => setIsOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </button>
        </nav>
      </div>
    </div>
  );
}
