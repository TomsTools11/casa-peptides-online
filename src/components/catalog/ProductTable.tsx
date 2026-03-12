'use client';

import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCompare } from '@/hooks/useCompare';
import styles from './ProductTable.module.css';

export default function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const { isInCompare, toggleCompare, isMaxed } = useCompare();

  if (products.length === 0) return null;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th} style={{ width: 40 }}></th>
            <th className={styles.th}>Cat #</th>
            <th className={styles.th}>Product Name</th>
            <th className={styles.th}>Size / Vial</th>
            <th className={styles.th}>Price / Vial</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => {
            const checked = isInCompare(p.cat);
            const disabled = !checked && isMaxed;
            return (
              <tr
                key={p.cat}
                className={styles.row}
                onClick={() => router.push(`/catalog/product/${p.cat}`)}
              >
                <td className={styles.td} onClick={e => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleCompare(p.cat)}
                  />
                </td>
                <td className={`${styles.td} ${styles.catCell}`}>{p.cat}</td>
                <td className={`${styles.td} ${styles.nameCell}`}>{p.name}</td>
                <td className={styles.td}>{p.size}</td>
                <td className={`${styles.td} ${styles.priceCell}`}>{formatPrice(p.boxPrice)}</td>
                <td className={`${styles.td} ${styles.descCell}`}>{p.desc}</td>
                <td className={styles.td}><span className={styles.categoryTag}>{p.category}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
