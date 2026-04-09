'use client';

import { useEffect } from 'react';
import { init } from '@plausible-analytics/tracker';

export default function PlausibleAnalytics() {
  useEffect(() => {
    init({
      domain: 'casalabs.shop',
    });
  }, []);

  return null;
}
