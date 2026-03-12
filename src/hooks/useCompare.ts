'use client';

import { useContext } from 'react';
import { CompareContext } from '@/components/providers/CompareProvider';

export function useCompare() {
  return useContext(CompareContext);
}
