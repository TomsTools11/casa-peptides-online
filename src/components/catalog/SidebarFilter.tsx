'use client';

import { useState } from 'react';
import styles from './SidebarFilter.module.css';

interface SidebarFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  priceMin: string;
  onPriceMinChange: (val: string) => void;
  priceMax: string;
  onPriceMaxChange: (val: string) => void;
  productCounts: Record<string, number>;
  totalCount: number;
}

export default function SidebarFilter({
  categories, activeCategory, onCategoryChange,
  priceMin, onPriceMinChange, priceMax, onPriceMaxChange,
  productCounts, totalCount,
}: SidebarFilterProps) {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => setCategoriesOpen(!categoriesOpen)}>
          <span>Categories</span>
          <span className={styles.chevron}>{categoriesOpen ? '\u2212' : '+'}</span>
        </button>
        {categoriesOpen && (
          <ul className={styles.categoryList}>
            <li>
              <button
                className={`${styles.categoryItem} ${activeCategory === 'all' ? styles.categoryItemActive : ''}`}
                onClick={() => onCategoryChange('all')}
              >
                <span>All Categories</span>
                <span className={styles.categoryCount}>{totalCount}</span>
              </button>
            </li>
            {categories.map(cat => (
              <li key={cat}>
                <button
                  className={`${styles.categoryItem} ${activeCategory === cat ? styles.categoryItemActive : ''}`}
                  onClick={() => onCategoryChange(cat)}
                >
                  <span>{cat}</span>
                  <span className={styles.categoryCount}>{productCounts[cat] || 0}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => setPriceOpen(!priceOpen)}>
          <span>Price Range</span>
          <span className={styles.chevron}>{priceOpen ? '\u2212' : '+'}</span>
        </button>
        {priceOpen && (
          <div className={styles.priceInputs}>
            <input
              type="number"
              className={styles.priceInput}
              placeholder="Min"
              value={priceMin}
              min="0"
              step="0.5"
              onChange={e => onPriceMinChange(e.target.value)}
            />
            <span className={styles.priceDash}>&mdash;</span>
            <input
              type="number"
              className={styles.priceInput}
              placeholder="Max"
              value={priceMax}
              min="0"
              step="0.5"
              onChange={e => onPriceMaxChange(e.target.value)}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
