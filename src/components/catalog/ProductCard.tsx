'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
      <div className={styles.imageBox}>
        <Image
          src="/images/logos/bottle-blank.png"
          alt={product.name}
          width={120}
          height={140}
          className={styles.productImage}
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardName}>{product.name}</div>
        <div className={styles.cardMeta}>
          <span className={styles.cardCategory}>{product.category}</span>
          <span className={styles.cardSize}>{product.size}</span>
        </div>
        <div className={styles.cardDesc}>
          {product.desc.split('. ')[0]}.
        </div>
        <div className={styles.cardPrice}>
          <span className={styles.priceLabel}>Starting at&hellip;</span>
          {formatPrice(product.boxPrice)}
        </div>
        <button
          className={styles.shopBtn}
          onClick={e => {
            e.stopPropagation();
            router.push(`/catalog/product/${product.cat}`);
          }}
        >
          Shop
        </button>
      </div>
    </div>
  );
}
