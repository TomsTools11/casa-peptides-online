export function formatPrice(boxPrice: number): string {
  if (boxPrice === 0) return 'TBD';
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

const productImageMap: Record<string, string> = {
  'Semax': 'Semax.png',
  'Selank': 'Selank.png',
  'CJC-1295 Without DAC (Mod GRF 1-29)': 'CJC1295WithoutDAC.png',
  'Epithalon': 'Epithalon.png',
  'AOD-9604': 'AOD-9604.png',
  'MOTS-c': 'MOTS-C.png',
  'Tesamorelin': 'Tesamorelin.png',
  'Ipamorelin': 'Ipamorelin.png',
};

export function getProductImage(productName: string): string {
  return productImageMap[productName]
    ? `/images/products/${productImageMap[productName]}`
    : '/images/logos/bottle-blank.png';
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
