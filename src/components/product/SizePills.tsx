import Link from 'next/link';
import type { Product } from '@/lib/types';
import styles from './SizePills.module.css';

interface SizePillsProps {
  variants: Product[];
  currentCat: string;
}

export default function SizePills({ variants, currentCat }: SizePillsProps) {
  return (
    <div className={styles.sizePills}>
      {variants.map(v => (
        <Link
          key={v.cat}
          href={`/store/${v.cat}`}
          className={`${styles.sizePill} ${v.cat === currentCat ? styles.active : ''}`}
        >
          {v.size}
        </Link>
      ))}
    </div>
  );
}
