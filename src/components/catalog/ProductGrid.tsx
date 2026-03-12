'use client';

import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className={styles.noResults}>
        <h3>No products found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map(p => (
        <ProductCard key={p.cat} product={p} />
      ))}
    </div>
  );
}
