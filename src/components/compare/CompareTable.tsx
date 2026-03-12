'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCompare } from '@/hooks/useCompare';
import { productByCat } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';
import styles from './CompareTable.module.css';

type Field = {
  label: string;
  getValue: (p: Product) => string;
};

const fields: Field[] = [
  { label: 'Product Name', getValue: p => p.name },
  { label: 'Catalog #', getValue: p => p.cat },
  { label: 'Category', getValue: p => p.category },
  { label: 'Size', getValue: p => p.size },
  { label: 'Price / Vial', getValue: p => formatPrice(p.boxPrice) },
  { label: 'Box Price (10 vials)', getValue: p => '$' + p.boxPrice },
  { label: 'Description', getValue: p => p.desc },
];

export default function CompareTable() {
  const { compareSet, toggleCompare } = useCompare();
  const [highlightDiffs, setHighlightDiffs] = useState(true);

  if (compareSet.size < 2) {
    return (
      <div className={styles.compareView}>
        <div className={styles.header}>
          <h2>Product Comparison</h2>
        </div>
        <div className={styles.empty}>
          <h3>Not enough products selected</h3>
          <p>Select at least 2 products to compare. <Link href="/catalog">Browse the catalog</Link> and use the checkboxes to select products.</p>
        </div>
      </div>
    );
  }

  const products = [...compareSet].map(cat => productByCat[cat]).filter(Boolean);

  return (
    <div className={styles.compareView}>
      <div className={styles.header}>
        <span className={styles.compareBadge}>{compareSet.size} Selected</span>
        <h2>Compare Products</h2>
      </div>

      <div className={styles.highlightToggle}>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={highlightDiffs}
            onChange={e => setHighlightDiffs(e.target.checked)}
          />
          <span className={styles.toggleSlider}></span>
        </label>
        <span>Highlight Differences</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className={styles.compareTable}>
          <thead>
            <tr>
              <th></th>
              {products.map(p => (
                <td key={p.cat} className={styles.colHeader}>
                  {p.name} ({p.cat})
                  <button
                    className={styles.colRemove}
                    onClick={() => toggleCompare(p.cat)}
                  >
                    &times;
                  </button>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map(f => {
              const values = products.map(p => f.getValue(p));
              const allSame = values.every(v => v === values[0]);
              const rowClass = !allSame && highlightDiffs ? styles.diffHighlight : '';
              return (
                <tr key={f.label} className={rowClass}>
                  <th>{f.label}</th>
                  {values.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
