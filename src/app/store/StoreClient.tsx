'use client';

import { useState, useMemo } from 'react';
import { peptides } from '@/lib/products';
import ProductGrid from '@/components/catalog/ProductGrid';
import styles from './store.module.css';

type SortKey = 'name-asc' | 'name-desc';

export default function StoreClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name-asc');

  const filtered = useMemo(() => {
    let result = [...peptides];

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) =>
      sortKey === 'name-asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return result;
  }, [searchTerm, sortKey]);

  return (
    <div className={styles.storePage}>
      <div className={styles.storeHeader}>
        <h1 className={styles.storeTitle}>Store</h1>
      </div>

      <div className={styles.controls}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.sortSelect}
          value={sortKey}
          onChange={e => setSortKey(e.target.value as SortKey)}
        >
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
        </select>
        <span className={styles.productCount}>{filtered.length} products</span>
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
