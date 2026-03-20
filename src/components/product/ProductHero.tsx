'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice, slugifyCategory } from '@/lib/utils';
import { productsByBaseName } from '@/lib/products';
import { useCompare } from '@/hooks/useCompare';
import SizePills from './SizePills';
import styles from './ProductHero.module.css';

export default function ProductHero({ product }: { product: Product }) {
  const { isInCompare, toggleCompare } = useCompare();
  const inCompare = isInCompare(product.cat);
  const variants = productsByBaseName[product.name] || [];
  const [qty, setQty] = useState(1);

  return (
    <div className={styles.productHero}>
      <div className={styles.imageBox}>
        <Image
          src="/images/logos/bottle-blank.png"
          alt="Product bottle"
          width={280}
          height={320}
          className={styles.productImage}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{product.name}</div>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles.badgeCat}`}>{product.cat}</span>
          <Link
            href={`/catalog/${slugifyCategory(product.category)}`}
            className={`${styles.badge} ${styles.badgeCategory}`}
          >
            {product.category}
          </Link>
        </div>
        <div className={styles.description}>{product.desc}</div>
        {variants.length > 1 && (
          <SizePills variants={variants} currentCat={product.cat} />
        )}
        <div className={styles.priceMain}>{formatPrice(product.boxPrice)}</div>
        <div className={styles.priceInfo}>{product.size} per vial &bull; Box of 10: ${product.boxPrice}</div>

        <div className={styles.qtyRow}>
          <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
          <span className={styles.qtyValue}>{qty}</span>
          <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
        </div>

        <button
          className={styles.btnAddToCart}
          onClick={() => toggleCompare(product.cat)}
        >
          {inCompare ? 'Added to Compare' : 'Add to Cart'}
        </button>

        {!inCompare && (
          <button
            className={styles.btnCompareLink}
            onClick={() => toggleCompare(product.cat)}
          >
            + Add to Compare
          </button>
        )}
      </div>
    </div>
  );
}
