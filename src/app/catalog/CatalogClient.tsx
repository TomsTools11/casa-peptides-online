'use client';

import { useState, useMemo } from 'react';
import { peptides, categories, productsByCategory } from '@/lib/products';
import { useProductFilter } from '@/hooks/useProductFilter';
import CategoryTabs from '@/components/catalog/CategoryTabs';
import ControlsBar from '@/components/catalog/ControlsBar';
import ProductGrid from '@/components/catalog/ProductGrid';
import ProductTable from '@/components/catalog/ProductTable';
import styles from './catalog.module.css';

export default function CatalogClient() {
  const [activeCategory, setActiveCategory] = useState('all');

  const source = useMemo(() =>
    activeCategory === 'all' ? peptides : (productsByCategory[activeCategory] || []),
    [activeCategory]
  );

  const {
    filtered, searchTerm, setSearchTerm,
    sortKey, setSortKey, viewMode, setViewMode,
    priceMin, setPriceMin, priceMax, setPriceMax,
  } = useProductFilter(source);

  return (
    <>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h2>Explore Our Peptide Catalog</h2>
          <p>{peptides.length} products across {categories.length} categories</p>
        </div>
        <div className={styles.heroSearch}>
          <div className={styles.searchBox}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <ControlsBar
        includeSearch={false}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortKey={sortKey}
        onSortChange={setSortKey}
        viewMode={viewMode}
        onViewChange={setViewMode}
        priceMin={priceMin}
        onPriceMinChange={setPriceMin}
        priceMax={priceMax}
        onPriceMaxChange={setPriceMax}
      />

      <div className="main">
        {viewMode === 'grid' ? (
          <ProductGrid products={filtered} />
        ) : (
          <ProductTable products={filtered} />
        )}
      </div>
    </>
  );
}
