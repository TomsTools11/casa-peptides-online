'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { productsByBaseName } from '@/lib/products';
import styles from './ProductTabs.module.css';

function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.accordionItem}>
      <button className={styles.accordionHeader} onClick={onToggle}>
        <span className={styles.accordionTitle}>{title}</span>
        <span className={`${styles.accordionChevron} ${isOpen ? styles.chevronOpen : ''}`}>
          &#8250;
        </span>
      </button>
      <div className={`${styles.accordionBody} ${isOpen ? styles.accordionBodyOpen : ''}`}>
        <div className={styles.accordionContent}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ProductTabs({ product }: { product: Product }) {
  const [openSection, setOpenSection] = useState<string | null>('benefits');
  const variants = productsByBaseName[product.name] || [];

  const toggle = (key: string) => {
    setOpenSection(prev => (prev === key ? null : key));
  };

  return (
    <div className={styles.productAccordion}>
      <AccordionItem
        title="Key Benefits"
        isOpen={openSection === 'benefits'}
        onToggle={() => toggle('benefits')}
      >
        <p className={styles.bodyText}>{product.desc}</p>
      </AccordionItem>

      <AccordionItem
        title="Important information"
        isOpen={openSection === 'important'}
        onToggle={() => toggle('important')}
      >
        <div className={styles.infoTable}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Category</span>
            <span>{product.category}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Catalog No.</span>
            <span className={styles.catValue}>{product.cat}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Size / Vial</span>
            <span>{product.size}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Box Contents</span>
            <span>10 vials &times; {product.size}</span>
          </div>
        </div>
        <p className={styles.researchNote}>
          This product is intended for research purposes only. Not for human consumption.
        </p>
      </AccordionItem>

      <AccordionItem
        title="How it works"
        isOpen={openSection === 'howitworks'}
        onToggle={() => toggle('howitworks')}
      >
        <p className={styles.bodyText}>
          {product.desc.split('. ').slice(0, 2).join('. ')}.
        </p>
      </AccordionItem>

      <AccordionItem
        title="Subscription and Billing Details"
        isOpen={openSection === 'billing'}
        onToggle={() => toggle('billing')}
      >
        {variants.length > 1 ? (
          <div className={styles.variantGrid}>
            {variants.map(v => (
              <Link
                key={v.cat}
                href={`/catalog/product/${v.cat}`}
                className={`${styles.variantCard} ${v.cat === product.cat ? styles.variantCardCurrent : ''}`}
              >
                <div className={styles.variantSize}>{v.size}</div>
                <div className={styles.variantPrice}>{formatPrice(v.boxPrice)}/vial</div>
                <div className={styles.variantCat}>{v.cat}</div>
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.bodyText}>
            {product.size} per vial &bull; Box of 10: ${product.boxPrice}
          </p>
        )}
      </AccordionItem>

      <AccordionItem
        title="Why Casa Labs"
        isOpen={openSection === 'why'}
        onToggle={() => toggle('why')}
      >
        <p className={styles.bodyText}>
          Trusted quality, rigorous testing, and expert support for your research needs.
          Every product is backed by third-party purity verification and dedicated customer service.
        </p>
      </AccordionItem>
    </div>
  );
}
