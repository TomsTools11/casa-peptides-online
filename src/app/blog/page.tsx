import { getAllPosts, blogCategories, postsByCategory } from '@/lib/blog';
import BlogClient from './BlogClient';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <BlogClient
      posts={posts}
      categories={blogCategories}
      postsByCategory={postsByCategory}
    />
  );
}
