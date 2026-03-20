'use client';

import type { Product } from '@/lib/types';
import { productsByBaseName, productsByCategory } from '@/lib/products';
import ProductGrid from '@/components/catalog/ProductGrid';
import styles from './RelatedProducts.module.css';

export default function RelatedProducts({ product }: { product: Product }) {
  const variants = productsByBaseName[product.name] || [];
  const variantCats = new Set(variants.map(v => v.cat));
  const related = (productsByCategory[product.category] || [])
    .filter(p => !variantCats.has(p.cat))
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className={styles.relatedSection}>
      <h3 className={styles.heading}>Related Research</h3>
      <ProductGrid products={related} />
    </div>
  );
}
