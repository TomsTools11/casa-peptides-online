'use client';

import { useState, useMemo } from 'react';
import { peptides, categories, productsByCategory } from '@/lib/products';
import { useProductFilter } from '@/hooks/useProductFilter';
import SidebarFilter from '@/components/catalog/SidebarFilter';
import ControlsBar from '@/components/catalog/ControlsBar';
import ProductGrid from '@/components/catalog/ProductGrid';
import ProductTable from '@/components/catalog/ProductTable';
import styles from './catalog.module.css';

export default function CatalogClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const source = useMemo(() =>
    activeCategory === 'all' ? peptides : (productsByCategory[activeCategory] || []),
    [activeCategory]
  );

  const {
    filtered, searchTerm, setSearchTerm,
    sortKey, setSortKey, viewMode, setViewMode,
    priceMin, setPriceMin, priceMax, setPriceMax,
  } = useProductFilter(source);

  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat] = (productsByCategory[cat] || []).length;
    });
    return counts;
  }, []);

  return (
    <div className={styles.catalogPage}>
      <div className={styles.catalogHeader}>
        <h1 className={styles.catalogTitle}>Catalogue</h1>
      </div>

      <ControlsBar
        includeSearch={true}
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
        productCount={filtered.length}
      />

      {viewMode === 'grid' ? (
        <ProductGrid products={filtered} />
      ) : (
        <ProductTable products={filtered} />
      )}

      {/* Mobile filter overlay */}
      <button
        className={styles.mobileFilterBtn}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        Filters
      </button>
      <div className={`${styles.sidebarOverlay} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <SidebarFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={(cat) => {
            setActiveCategory(cat);
            setSidebarOpen(false);
          }}
          priceMin={priceMin}
          onPriceMinChange={setPriceMin}
          priceMax={priceMax}
          onPriceMaxChange={setPriceMax}
          productCounts={productCounts}
          totalCount={peptides.length}
        />
      </div>
    </div>
  );
}
