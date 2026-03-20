'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { productsByBaseName } from '@/lib/products';
import styles from './ProductTabs.module.css';

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<'description' | 'research' | 'reviews'>('description');
  const variants = productsByBaseName[product.name] || [];

  return (
    <div className={styles.productTabs}>
      <div className={styles.tabNav}>
        <button
          className={`${styles.tabNavBtn} ${activeTab === 'description' ? styles.tabNavBtnActive : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`${styles.tabNavBtn} ${activeTab === 'research' ? styles.tabNavBtnActive : ''}`}
          onClick={() => setActiveTab('research')}
        >
          Research Information
        </button>
        <button
          className={`${styles.tabNavBtn} ${activeTab === 'reviews' ? styles.tabNavBtnActive : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className={`${styles.tabPanel} ${activeTab === 'description' ? styles.tabPanelActive : ''}`}>
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

      <div className={`${styles.tabPanel} ${activeTab === 'research' ? styles.tabPanelActive : ''}`}>
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
        <div className={styles.researchNote}>
          <p>This product is intended for research purposes only. Not for human consumption.</p>
        </div>
      </div>

      <div className={`${styles.tabPanel} ${activeTab === 'reviews' ? styles.tabPanelActive : ''}`}>
        <div className={styles.reviewsPlaceholder}>
          <p>No reviews yet. Be the first to review this product.</p>
        </div>
      </div>
    </div>
  );
}
