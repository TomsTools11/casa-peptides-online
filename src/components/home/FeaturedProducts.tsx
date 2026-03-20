import Link from 'next/link';
import Image from 'next/image';
import { peptides } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import styles from './FeaturedProducts.module.css';

const featuredNames = ['Semaglutide', 'Tirzepatide', 'BPC-157', 'NAD+'];

function getFeatured() {
  const seen = new Set<string>();
  return peptides.filter(p => {
    if (featuredNames.includes(p.name) && !seen.has(p.name)) {
      seen.add(p.name);
      return true;
    }
    return false;
  }).slice(0, 4);
}

export default function FeaturedProducts() {
  const featured = getFeatured();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>Current Featured Inventory</span>
        <h2 className={styles.heading}>Primary Research Assets</h2>
      </div>
      <div className={styles.grid}>
        {featured.map(product => (
          <Link
            key={product.cat}
            href={`/catalog/product/${product.cat}`}
            className={styles.card}
          >
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
              <div className={styles.nameRow}>
                <span className={styles.productName}>{product.name}</span>
                <span className={styles.productPrice}>{formatPrice(product.boxPrice)}</span>
              </div>
              <p className={styles.productMeta}>
                {product.size} &middot; {product.category}
              </p>
              <span className={styles.addBtn}>Add to Research</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
