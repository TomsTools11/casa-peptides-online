import type { Product } from './types';
import type { ConsolidatedCategory } from '@/data/consolidated-categories';
import { consolidatedCategories as rawCategories } from '@/data/consolidated-categories';
import { productsByCategory } from './products';

export const consolidatedCategories: ConsolidatedCategory[] = rawCategories
  .slice()
  .sort((a, b) => a.sortOrder - b.sortOrder);

export const categoryBySlug: Record<string, ConsolidatedCategory> = {};
consolidatedCategories.forEach(cat => {
  categoryBySlug[cat.slug] = cat;
});

export const productsByConsolidatedCategory: Record<string, Product[]> = {};
consolidatedCategories.forEach(cat => {
  const products: Product[] = [];
  cat.sourceCategories.forEach(src => {
    const srcProducts = productsByCategory[src];
    if (srcProducts) products.push(...srcProducts);
  });
  productsByConsolidatedCategory[cat.slug] = products;
});

export function getCategoryStats(slug: string): { skuCount: number; productCount: number } {
  const products = productsByConsolidatedCategory[slug] || [];
  const uniqueNames = new Set(products.map(p => p.name));
  return { skuCount: products.length, productCount: uniqueNames.size };
}
