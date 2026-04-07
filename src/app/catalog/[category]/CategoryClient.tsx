'use client';

import { productsByCategory } from '@/lib/products';
import { categoryBySlug, productsByConsolidatedCategory } from '@/lib/categories';
import { deslugifyCategory } from '@/lib/utils';
import { useProductFilter } from '@/hooks/useProductFilter';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ControlsBar from '@/components/catalog/ControlsBar';
import ProductGrid from '@/components/catalog/ProductGrid';
import ProductTable from '@/components/catalog/ProductTable';
import styles from './category.module.css';

export default function CategoryClient({ categorySlug }: { categorySlug: string }) {
  // Check consolidated category first, then fall back to original
  const consolidated = categoryBySlug[categorySlug];
  const categoryName = consolidated ? consolidated.name : deslugifyCategory(categorySlug);
  const catProducts = consolidated
    ? productsByConsolidatedCategory[categorySlug]
    : productsByCategory[deslugifyCategory(categorySlug)] || [];

  const {
    filtered, searchTerm, setSearchTerm,
    sortKey, setSortKey, viewMode, setViewMode,
    priceMin, setPriceMin, priceMax, setPriceMax,
  } = useProductFilter(catProducts);

  if (catProducts.length === 0) {
    return (
      <div className="main">
        <div className={styles.noResults}>
          <h3>Category not found</h3>
          <p><a href="/catalog">Back to Catalog</a></p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Catalog', href: '/catalog' },
        { label: categoryName },
      ]} />

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

      <div className="main">
        <div className={styles.categoryHeader}>
          <h2>{categoryName}</h2>
          <div className={styles.count}>{catProducts.length} product{catProducts.length !== 1 ? 's' : ''}</div>
        </div>
        {viewMode === 'grid' ? (
          <ProductGrid products={filtered} />
        ) : (
          <ProductTable products={filtered} />
        )}
      </div>
    </>
  );
}
