import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost, BlogPostMeta } from './blog-types';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

function readPost(fileName: string): BlogPost {
  const slug = fileName.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    author: data.author,
    category: data.category,
    tags: data.tags ?? [],
    readingTime: data.readingTime ?? '5 min read',
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  return files.map(readPost).sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const fileName = `${slug}.mdx`;
  const filePath = path.join(BLOG_DIR, fileName);
  if (!fs.existsSync(filePath)) return undefined;
  return readPost(fileName);
}

export function getAllSlugs(): string[] {
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''));
}

const _posts = getAllPosts();

export const blogCategories: string[] = [...new Set(_posts.map(p => p.category))].sort();

export const postsByCategory: Record<string, BlogPostMeta[]> = {};
_posts.forEach(p => {
  (postsByCategory[p.category] ||= []).push(p);
});
