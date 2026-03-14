import type { BlogPostMeta } from '@/lib/blog-types';
import BlogCard from './BlogCard';
import styles from './BlogGrid.module.css';

export default function BlogGrid({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) {
    return (
      <div className={styles.noResults}>
        <h3>No posts found</h3>
        <p>Try selecting a different category.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {posts.map(p => (
        <BlogCard key={p.slug} post={p} />
      ))}
    </div>
  );
}
