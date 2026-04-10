export interface Product {
  cat: string;
  name: string;
  size: string;
  boxPrice: number;
  category: string;
  desc: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
