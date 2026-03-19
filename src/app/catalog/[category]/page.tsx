import { categories } from '@/lib/products';
import { consolidatedCategories } from '@/lib/categories';
import CategoryClient from './CategoryClient';

export function generateStaticParams() {
  const originalParams = categories.map(cat => ({ category: cat }));
  const consolidatedParams = consolidatedCategories.map(cat => ({ category: cat.slug }));
  return [...originalParams, ...consolidatedParams];
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return <CategoryClient categorySlug={category} />;
}
