'use client';

import { categories, productsByCategory, peptides } from '@/lib/products';
import styles from './CategoryTabs.module.css';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className={styles.categoryTabs}>
      <button
        className={`${styles.tabPill} ${activeCategory === 'all' ? styles.active : ''}`}
        onClick={() => onCategoryChange('all')}
      >
        All Categories ({peptides.length})
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          className={`${styles.tabPill} ${activeCategory === cat ? styles.active : ''}`}
          onClick={() => onCategoryChange(cat)}
        >
          {cat} ({productsByCategory[cat].length})
        </button>
      ))}
    </div>
  );
}
