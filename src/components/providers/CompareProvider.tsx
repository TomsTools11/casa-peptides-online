'use client';

import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';

export const CompareContext = createContext<{
  compareSet: Set<string>;
  toggleCompare: (cat: string) => void;
  clearCompare: () => void;
  isInCompare: (cat: string) => boolean;
  isMaxed: boolean;
}>({
  compareSet: new Set(),
  toggleCompare: () => {},
  clearCompare: () => {},
  isInCompare: () => false,
  isMaxed: false,
});

const MAX_COMPARE = 4;

export default function CompareProvider({ children }: { children: ReactNode }) {
  const [compareSet, setCompareSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = sessionStorage.getItem('compareSet');
    if (stored) {
      try {
        setCompareSet(new Set(JSON.parse(stored)));
      } catch {}
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('compareSet', JSON.stringify([...compareSet]));
  }, [compareSet]);

  const toggleCompare = useCallback((cat: string) => {
    setCompareSet(prev => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else if (next.size < MAX_COMPARE) {
        next.add(cat);
      }
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareSet(new Set());
  }, []);

  const isInCompare = useCallback((cat: string) => {
    return compareSet.has(cat);
  }, [compareSet]);

  const isMaxed = compareSet.size >= MAX_COMPARE;

  return (
    <CompareContext.Provider value={{ compareSet, toggleCompare, clearCompare, isInCompare, isMaxed }}>
      {children}
    </CompareContext.Provider>
  );
}
