'use client';

import { useState, useRef, useEffect } from 'react';
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
  productCount?: number;
}

export default function ControlsBar({
  includeSearch, searchTerm, onSearchChange,
  sortKey, onSortChange,
  viewMode, onViewChange,
  priceMin, onPriceMinChange,
  priceMax, onPriceMaxChange,
  productCount,
}: ControlsBarProps) {
  const [priceOpen, setPriceOpen] = useState(false);
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (priceRef.current && !priceRef.current.contains(e.target as Node)) {
        setPriceOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className={styles.controls}>
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Filter:</span>

        {priceMin !== undefined && onPriceMinChange && onPriceMaxChange && (
          <div className={styles.filterChipWrapper} ref={priceRef}>
            <button
              className={`${styles.filterChip} ${priceOpen ? styles.filterChipActive : ''}`}
              onClick={() => setPriceOpen(!priceOpen)}
            >
              Price <span className={styles.chevron}>&#9662;</span>
            </button>
            {priceOpen && (
              <div className={styles.filterDropdown}>
                <div className={styles.filterDropdownRow}>
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
              </div>
            )}
          </div>
        )}

        {includeSearch && (
          <div className={styles.searchBox}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className={styles.sortGroup}>
        <label className={styles.sortLabel}>
          Sort by:
          <select
            className={styles.sortSelect}
            value={sortKey}
            onChange={e => onSortChange(e.target.value as SortKey)}
          >
            <option value="name-asc">Featured</option>
            <option value="name-desc">Name Z→A</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="cat-asc">Cat # A→Z</option>
          </select>
        </label>

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

        {productCount !== undefined && (
          <span className={styles.productCount}>{productCount} products</span>
        )}
      </div>
    </div>
  );
}
