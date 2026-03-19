import Link from 'next/link';
import { peptides } from '@/lib/products';
import { consolidatedCategories } from '@/lib/categories';
import styles from './HomeHero.module.css';

export default function HomeHero() {
  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Product Catalog</h1>
        <p className={styles.subtitle}>
          Browse {peptides.length} products across {consolidatedCategories.length} categories.
          Research-grade peptides, compounds, and supplies.
        </p>
        <Link href="/catalog" className={styles.cta}>
          Browse Full Catalog &rarr;
        </Link>
      </div>
    </div>
  );
}
