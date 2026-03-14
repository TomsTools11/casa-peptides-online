'use client';

import { useState, useMemo } from 'react';
import type { BlogPostMeta } from '@/lib/blog-types';
import BlogCategoryTabs from '@/components/blog/BlogCategoryTabs';
import BlogGrid from '@/components/blog/BlogGrid';
import styles from './blog.module.css';

interface BlogClientProps {
  posts: BlogPostMeta[];
  categories: string[];
  postsByCategory: Record<string, BlogPostMeta[]>;
}

export default function BlogClient({ posts, categories, postsByCategory }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() =>
    activeCategory === 'all' ? posts : (postsByCategory[activeCategory] || []),
    [activeCategory, posts, postsByCategory]
  );

  return (
    <>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h2>Blog &amp; Research Updates</h2>
          <p>{posts.length} {posts.length === 1 ? 'article' : 'articles'} across {categories.length} {categories.length === 1 ? 'category' : 'categories'}</p>
        </div>
      </div>

      <BlogCategoryTabs
        categories={categories}
        postsByCategory={postsByCategory}
        totalCount={posts.length}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="main">
        <BlogGrid posts={filtered} />
      </div>
    </>
  );
}
