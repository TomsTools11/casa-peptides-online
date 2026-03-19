import Link from 'next/link';
import type { ConsolidatedCategory } from '@/data/consolidated-categories';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
  category: ConsolidatedCategory;
  stats: { skuCount: number; productCount: number };
  delay: number;
}

export default function CategoryCard({ category, stats, delay }: CategoryCardProps) {
  return (
    <Link
      href={`/catalog/${category.slug}`}
      className={styles.card}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={styles.accent} />
      <div className={styles.body}>
        <h2 className={styles.name}>{category.name}</h2>
        <p className={styles.description}>{category.description}</p>
        <div className={styles.pills}>
          {category.featuredProducts.map(product => (
            <span key={product} className={styles.pill}>{product}</span>
          ))}
        </div>
        <div className={styles.footer}>
          <span className={styles.count}>
            <strong>{stats.productCount}</strong> product{stats.productCount !== 1 ? 's' : ''} &middot; {stats.skuCount} SKU{stats.skuCount !== 1 ? 's' : ''}
          </span>
          <span className={styles.arrow}>&rarr;</span>
        </div>
      </div>
    </Link>
  );
}
