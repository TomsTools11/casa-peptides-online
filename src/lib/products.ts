import type { Product } from './types';
import peptidesData from '@/data/peptides.json';

export const peptides: Product[] = peptidesData as Product[];

export const productByCat: Record<string, Product> = {};
export const productsByCategory: Record<string, Product[]> = {};
export const productsByBaseName: Record<string, Product[]> = {};

peptides.forEach(p => {
  productByCat[p.cat] = p;
  (productsByCategory[p.category] ||= []).push(p);
  (productsByBaseName[p.name] ||= []).push(p);
});

export const categories = Object.keys(productsByCategory).sort();
