import { categories } from '@/lib/products';
import CategoryClient from './CategoryClient';

export function generateStaticParams() {
  return categories.map(cat => ({
    category: cat,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return <CategoryClient categorySlug={category} />;
}
