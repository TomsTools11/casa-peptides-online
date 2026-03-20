'use client';

import type { SortKey, ViewMode } from '@/hooks/useProductFilter';
import styles from './ControlsBar.module.css';

interface ControlsBarProps {
  includeSearch: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortKey: SortKey;
  onSortChange: (value: SortKey) => void;
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  priceMin?: string;
  onPriceMinChange?: (value: string) => void;
  priceMax?: string;
  onPriceMaxChange?: (value: string) => void;
}

export default function ControlsBar({
  includeSearch, searchTerm, onSearchChange,
  sortKey, onSortChange,
  viewMode, onViewChange,
  priceMin, onPriceMinChange,
  priceMax, onPriceMaxChange,
}: ControlsBarProps) {
  return (
    <div className={`${styles.controls} ${includeSearch ? styles.withSearch : ''}`}>
      {includeSearch && (
        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name, catalog #, or description..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
      )}
      {priceMin !== undefined && onPriceMinChange && onPriceMaxChange && (
        <div className={styles.priceFilter}>
          <span>Price:</span>
          <input
            type="number"
            className={styles.priceInput}
            placeholder="Min"
            value={priceMin}
            min="0"
            step="0.5"
            onChange={e => onPriceMinChange(e.target.value)}
          />
          <span>&mdash;</span>
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
      <select
        className={styles.sortSelect}
        value={sortKey}
        onChange={e => onSortChange(e.target.value as SortKey)}
      >
        <option value="name-asc">Name A&rarr;Z</option>
        <option value="name-desc">Name Z&rarr;A</option>
        <option value="price-asc">Price: Low &rarr; High</option>
        <option value="price-desc">Price: High &rarr; Low</option>
        <option value="cat-asc">Cat # A&rarr;Z</option>
      </select>
      <div className={styles.viewToggle}>
        <button
          className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
          onClick={() => onViewChange('grid')}
          title="Card View"
        >&#9638;</button>
        <button
          className={`${styles.viewBtn} ${viewMode === 'table' ? styles.viewBtnActive : ''}`}
          onClick={() => onViewChange('table')}
          title="Table View"
        >&#9776;</button>
      </div>
    </div>
  );
}
