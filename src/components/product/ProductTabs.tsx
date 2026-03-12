'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { productsByBaseName, productsByCategory } from '@/lib/products';
import ProductGrid from '@/components/catalog/ProductGrid';
import styles from './ProductTabs.module.css';

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');
  const variants = productsByBaseName[product.name] || [];

  // Related products — same category, excluding same-name variants
  const variantCats = new Set(variants.map(v => v.cat));
  const related = (productsByCategory[product.category] || [])
    .filter(p => !variantCats.has(p.cat))
    .slice(0, 6);

  return (
    <div className={styles.productTabs}>
      <div className={styles.tabNav}>
        <button
          className={`${styles.tabNavBtn} ${activeTab === 'overview' ? styles.tabNavBtnActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tabNavBtn} ${activeTab === 'details' ? styles.tabNavBtnActive : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
      </div>

      <div className={`${styles.tabPanel} ${activeTab === 'overview' ? styles.tabPanelActive : ''}`}>
        <table className={styles.infoTable}>
          <tbody>
            <tr><th>Category</th><td>{product.category}</td></tr>
            <tr><th>Catalog No.</th><td className={styles.catValue}>{product.cat}</td></tr>
            <tr><th>Size / Vial</th><td>{product.size}</td></tr>
            <tr><th>Description</th><td>{product.desc}</td></tr>
            <tr><th>Box Contents</th><td>10 vials &times; {product.size}</td></tr>
          </tbody>
        </table>
      </div>

      <div className={`${styles.tabPanel} ${activeTab === 'details' ? styles.tabPanelActive : ''}`}>
        {variants.length > 1 && (
          <div className={styles.sizeVariants}>
            <h3>All Size Variants</h3>
            <div className={styles.variantGrid}>
              {variants.map(v => (
                <Link
                  key={v.cat}
                  href={`/catalog/product/${v.cat}`}
                  className={`${styles.variantCard} ${v.cat === product.cat ? styles.variantCardCurrent : ''}`}
                >
                  <div className={styles.variantSize}>{v.size}</div>
                  <div className={styles.variantPrice}>{formatPrice(v.boxPrice)}/vial</div>
                  <div className={styles.variantCat}>{v.cat}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '1.15rem',
              color: 'var(--color-text-primary)',
              marginBottom: '1rem',
            }}>Related Products in {product.category}</h3>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </div>
  );
}
