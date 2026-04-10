'use client';

import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Product, CartItem } from '@/lib/types';

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (cat: string) => void;
  updateQuantity: (cat: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'casa-cart';

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setCartItems(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems, hydrated]);

  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.cat === product.cat);
      if (existing) {
        return prev.map(item =>
          item.product.cat === product.cat
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((cat: string) => {
    setCartItems(prev => prev.filter(item => item.product.cat !== cat));
  }, []);

  const updateQuantity = useCallback((cat: string, qty: number) => {
    if (qty <= 0) {
      setCartItems(prev => prev.filter(item => item.product.cat !== cat));
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.cat === cat ? { ...item, quantity: qty } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, isOpen, setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}
