import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import Breadcrumb from '@/components/layout/Breadcrumb';
import BlogPostLayout from '@/components/blog/BlogPostLayout';

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} — Casa Peptides Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="main" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
          Post not found
        </h3>
        <p><a href="/blog" style={{ color: 'var(--color-accent-hover)' }}>Back to Blog</a></p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={[
        { label: 'Blog', href: '/blog' },
        { label: post.category },
        { label: post.title },
      ]} />
      <BlogPostLayout meta={post}>
        <MDXRemote source={post.content} />
      </BlogPostLayout>
    </>
  );
}
