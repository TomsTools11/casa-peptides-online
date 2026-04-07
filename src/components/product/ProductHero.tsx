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
          width={320}
          height={360}
          className={styles.productImage}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.stockBadge}>
          <span className={styles.stockDot} />
          IN-STOCK
        </div>

        <h1 className={styles.title}>{product.name}</h1>

        <p className={styles.description}>{product.desc}</p>

        <div className={styles.priceMain}>{formatPrice(product.boxPrice)}</div>
        <div className={styles.shippingNote}>
          <Link href={`/catalog/${slugifyCategory(product.category)}`} className={styles.categoryLink}>
            {product.category}
          </Link>
          {' · '}Shipping calculated at checkout.
        </div>

        {variants.length > 1 && (
          <SizePills variants={variants} currentCat={product.cat} />
        )}

        <button
          className={styles.btnBuyNow}
          onClick={() => toggleCompare(product.cat)}
        >
          {inCompare ? 'Added to Compare' : 'Buy now'}
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
