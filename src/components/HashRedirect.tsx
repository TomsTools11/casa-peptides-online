'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#/')) return;

    const path = hash.replace('#/', '/');
    // Map old hash routes to new paths
    if (path.startsWith('/catalog') || path === '/') {
      router.replace('/catalog');
    } else if (path.startsWith('/product/')) {
      const cat = path.replace('/product/', '');
      router.replace(`/catalog/product/${cat}`);
    } else if (path.startsWith('/category/')) {
      const category = path.replace('/category/', '');
      router.replace(`/catalog/${category}`);
    } else if (path.startsWith('/compare')) {
      router.replace('/compare');
    }
  }, [router]);

  return null;
}
