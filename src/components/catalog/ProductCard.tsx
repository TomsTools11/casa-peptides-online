'use client';

import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCompare } from '@/hooks/useCompare';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { isInCompare, toggleCompare, isMaxed } = useCompare();

  const checked = isInCompare(product.cat);
  const disabled = !checked && isMaxed;

  return (
    <div
      className={`${styles.card} ${checked ? styles.compareSelected : ''}`}
      onClick={() => router.push(`/catalog/product/${product.cat}`)}
    >
      <label className={styles.compareCheckbox} onClick={e => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={() => toggleCompare(product.cat)}
        />
      </label>
      <div className={styles.cardHeader}>
        <div className={styles.cardName}>{product.name}</div>
        <div className={styles.cardCat}>{product.cat}</div>
      </div>
      <div className={styles.cardDesc}>{product.desc}</div>
      <span className={styles.cardTag}>{product.category}</span>
      <div className={styles.cardFooter}>
        <div>
          <div className={styles.cardPrice}>
            {formatPrice(product.boxPrice)} <span className={styles.cardPriceLabel}>/ vial</span>
          </div>
          <div className={styles.cardSize}>{product.size} per vial &bull; Box of 10: ${product.boxPrice}</div>
        </div>
      </div>
    </div>
  );
}
