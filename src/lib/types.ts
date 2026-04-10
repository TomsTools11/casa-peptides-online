export interface Product {
  cat: string;
  name: string;
  size: string;
  boxPrice: number;
  category: string;
  desc: string;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
