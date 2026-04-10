'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <div
      className={styles.card}
      onClick={() => router.push(`/store/${product.cat}`)}
    >
      <div className={styles.imageBox}>
        <Image
          src="/images/logos/bottle-blank.png"
          alt={product.name}
          width={140}
          height={140}
          className={styles.productImage}
        />
      </div>
      <div className={styles.cardBody}>
        <span className={product.inStock ? styles.statusBadgeInStock : styles.statusBadgeComingSoon}>
          {product.inStock ? '🟢 In Stock' : '🟠 Coming Soon'}
        </span>
        <div className={styles.cardName}>{product.name}</div>
        <div className={styles.cardCategory}>{product.category.toUpperCase()}</div>
        <div className={styles.cardPrice}>{formatPrice(product.boxPrice)}</div>
        <button
          className={styles.addToCartBtn}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
