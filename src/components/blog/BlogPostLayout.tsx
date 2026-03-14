import type { BlogPostMeta } from '@/lib/blog-types';
import { formatDate } from '@/lib/utils';
import styles from './BlogPostLayout.module.css';

interface BlogPostLayoutProps {
  meta: BlogPostMeta;
  children: React.ReactNode;
}

export default function BlogPostLayout({ meta, children }: BlogPostLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.category}>{meta.category}</span>
        <h1 className={styles.title}>{meta.title}</h1>
        <div className={styles.meta}>
          <span>{meta.author}</span>
          <span className={styles.sep}>&middot;</span>
          <span>{formatDate(meta.date)}</span>
          <span className={styles.sep}>&middot;</span>
          <span>{meta.readingTime}</span>
        </div>
      </header>

      <article className={styles.prose}>
        {children}
      </article>

      {meta.tags.length > 0 && (
        <footer className={styles.tags}>
          {meta.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </footer>
      )}
    </div>
  );
}
