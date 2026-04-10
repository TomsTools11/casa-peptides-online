import Link from 'next/link';
import Image from 'next/image';
import { uniqueProducts } from '@/lib/products';
import { formatPrice, getProductImage } from '@/lib/utils';
import styles from './FeaturedProducts.module.css';

export default function FeaturedProducts() {
  const products = uniqueProducts;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>Available Now</span>
        <h2 className={styles.heading}>Our Products</h2>
      </div>
      <div className={styles.grid}>
        {products.map(product => (
          <Link
            key={product.cat}
            href={`/store/${product.cat}`}
            className={styles.card}
          >
            <div className={styles.imageBox}>
              <Image
                src={getProductImage(product.name)}
                alt={product.name}
                width={120}
                height={140}
                className={styles.productImage}
              />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.nameRow}>
                <span className={styles.productName}>{product.name}</span>
                <span className={styles.productPrice}>{formatPrice(product.boxPrice)}</span>
              </div>
              <p className={styles.productMeta}>
                {product.size} &middot; {product.category}
              </p>
              <span className={styles.addBtn}>View Product</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
