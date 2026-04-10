'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#/')) return;

    const path = hash.replace('#/', '/');
    if (path.startsWith('/catalog') || path.startsWith('/store') || path === '/') {
      router.replace('/store');
    } else if (path.startsWith('/product/')) {
      const cat = path.replace('/product/', '');
      router.replace(`/store/${cat}`);
    }
  }, [router]);

  return null;
}
