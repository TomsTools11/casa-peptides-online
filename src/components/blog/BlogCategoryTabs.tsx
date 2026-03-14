'use client';

import type { BlogPostMeta } from '@/lib/blog-types';
import styles from './BlogCategoryTabs.module.css';

interface BlogCategoryTabsProps {
  categories: string[];
  postsByCategory: Record<string, BlogPostMeta[]>;
  totalCount: number;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function BlogCategoryTabs({
  categories,
  postsByCategory,
  totalCount,
  activeCategory,
  onCategoryChange,
}: BlogCategoryTabsProps) {
  return (
    <div className={styles.categoryTabs}>
      <button
        className={`${styles.tabPill} ${activeCategory === 'all' ? styles.active : ''}`}
        onClick={() => onCategoryChange('all')}
      >
        All Posts ({totalCount})
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          className={`${styles.tabPill} ${activeCategory === cat ? styles.active : ''}`}
          onClick={() => onCategoryChange(cat)}
        >
          {cat} ({postsByCategory[cat]?.length ?? 0})
        </button>
      ))}
    </div>
  );
}
