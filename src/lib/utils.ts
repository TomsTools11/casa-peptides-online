export function formatPrice(boxPrice: number): string {
  const perVial = boxPrice / 10;
  return '$' + (Number.isInteger(perVial) ? perVial.toFixed(0) : perVial.toFixed(2));
}

export function perVialPrice(boxPrice: number): number {
  return boxPrice / 10;
}

export function slugifyCategory(category: string): string {
  return encodeURIComponent(category);
}

export function deslugifyCategory(slug: string): string {
  return decodeURIComponent(slug);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
