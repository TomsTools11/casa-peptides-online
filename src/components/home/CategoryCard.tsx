import Link from 'next/link';
import type { ConsolidatedCategory } from '@/data/consolidated-categories';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
  category: ConsolidatedCategory;
  stats: { skuCount: number; productCount: number };
  delay: number;
}

const categoryIcons: Record<string, string> = {
  'peptides': '\u{1F9EA}',
  'research-compounds': '\u{1F52C}',
  'growth-factors': '\u{1F9EC}',
  'amino-acids': '\u{2697}',
  'accessories': '\u{1F9F0}',
  'cosmetic-peptides': '\u{2728}',
  'metabolic': '\u{1F525}',
  'sexual-health': '\u{1F48A}',
};

export default function CategoryCard({ category, stats, delay }: CategoryCardProps) {
  const icon = categoryIcons[category.slug] || '\u{1F4CB}';

  return (
    <Link
      href={`/catalog/${category.slug}`}
      className={styles.card}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className={styles.icon}>{icon}</span>
      <h2 className={styles.name}>{category.name}</h2>
      <p className={styles.count}>{stats.productCount} products</p>
    </Link>
  );
}
