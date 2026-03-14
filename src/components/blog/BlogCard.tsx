'use client';

import { useRouter } from 'next/navigation';
import type { BlogPostMeta } from '@/lib/blog-types';
import { formatDate } from '@/lib/utils';
import styles from './BlogCard.module.css';

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  const router = useRouter();

  return (
    <div
      className={styles.card}
      onClick={() => router.push(`/blog/${post.slug}`)}
    >
      <span className={styles.category}>{post.category}</span>
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.description}>{post.description}</p>
      <div className={styles.footer}>
        <span className={styles.date}>{formatDate(post.date)}</span>
        <span className={styles.readTime}>{post.readingTime}</span>
      </div>
    </div>
  );
}
