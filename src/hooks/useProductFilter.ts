'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/lib/types';
import { perVialPrice } from '@/lib/utils';

export type SortKey = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'cat-asc';
export type ViewMode = 'grid' | 'table';

export function useProductFilter(products: Product[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name-asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (priceMin !== '') {
      const min = parseFloat(priceMin);
      if (!isNaN(min)) result = result.filter(p => perVialPrice(p.boxPrice) >= min);
    }

    if (priceMax !== '') {
      const max = parseFloat(priceMax);
      if (!isNaN(max)) result = result.filter(p => perVialPrice(p.boxPrice) <= max);
    }

    const [key, dir] = sortKey.split('-') as [string, string];
    result.sort((a, b) => {
      let va: string | number, vb: string | number;
      if (key === 'name') { va = a.name; vb = b.name; }
      else if (key === 'price') { va = perVialPrice(a.boxPrice); vb = perVialPrice(b.boxPrice); }
      else { va = a.cat; vb = b.cat; }
      if (typeof va === 'string' && typeof vb === 'string') {
        return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return dir === 'asc' ? (va as number) - (vb as number) : (vb as number) - (va as number);
    });

    return result;
  }, [products, searchTerm, sortKey, priceMin, priceMax]);

  return {
    filtered,
    searchTerm, setSearchTerm,
    sortKey, setSortKey,
    viewMode, setViewMode,
    priceMin, setPriceMin,
    priceMax, setPriceMax,
  };
}
