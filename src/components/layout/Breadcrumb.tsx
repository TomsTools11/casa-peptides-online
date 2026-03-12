import Link from 'next/link';
import styles from './Breadcrumb.module.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className={styles.breadcrumb}>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className={styles.sep}>&rsaquo;</span>}
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
