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
