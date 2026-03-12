'use client';

import Link from 'next/link';
import { useCompare } from '@/hooks/useCompare';
import styles from './CompareBar.module.css';

export default function CompareBar() {
  const { compareSet, clearCompare, isMaxed } = useCompare();

  const visible = compareSet.size >= 2;

  return (
    <div className={`${styles.compareBar} ${visible ? styles.visible : ''}`}>
      <span className={styles.compareCount}>{compareSet.size} products selected</span>
      {isMaxed && <span className={styles.maxNotice}>Max 4</span>}
      <button className={`${styles.btn} ${styles.btnClear}`} onClick={clearCompare}>Clear</button>
      <Link href="/compare" className={styles.btn}>Compare Now &rarr;</Link>
    </div>
  );
}
