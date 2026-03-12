'use client';

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
        <div className={styles.priceBox}>
          <div className={styles.priceSize}>{product.size} per vial</div>
          <div className={styles.priceMain}>{formatPrice(product.boxPrice)} <small>/ vial</small></div>
          <div className={styles.priceBoxInfo}>Box of 10 vials: <strong>${product.boxPrice}</strong></div>
        </div>
        <button
          className={`${styles.btnCompare} ${inCompare ? styles.btnCompareAdded : ''}`}
          onClick={() => toggleCompare(product.cat)}
        >
          {inCompare ? 'Remove from Compare' : 'Add to Compare'}
        </button>
      </div>
    </div>
  );
}
