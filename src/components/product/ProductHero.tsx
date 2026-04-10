'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { productsByBaseName } from '@/lib/products';
import { useCart } from '@/hooks/useCart';
import SizePills from './SizePills';
import styles from './ProductHero.module.css';

export default function ProductHero({ product }: { product: Product }) {
  const { addToCart } = useCart();
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
        <div className={`${styles.stockBadge} ${product.inStock ? styles.stockBadgeInStock : styles.stockBadgeComingSoon}`}>
          <span className={`${styles.stockDot} ${product.inStock ? styles.dotInStock : styles.dotComingSoon}`} />
          {product.inStock ? 'IN-STOCK' : 'COMING SOON'}
        </div>

        <h1 className={styles.title}>{product.name}</h1>

        <p className={styles.description}>{product.desc}</p>

        <div className={styles.priceMain}>{formatPrice(product.boxPrice)}</div>
        <div className={styles.shippingNote}>
          <Link href="/store" className={styles.categoryLink}>
            {product.category}
          </Link>
          {' · '}Shipping calculated at checkout.
        </div>

        {variants.length > 1 && (
          <SizePills variants={variants} currentCat={product.cat} />
        )}

        <button
          className={styles.btnBuyNow}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

        <div className={styles.keyBenefits}>
          <h3 className={styles.keyBenefitsTitle}>Key Benefits</h3>
          <p className={styles.keyBenefitsText}>{product.desc}</p>
        </div>
      </div>
    </div>
  );
}
