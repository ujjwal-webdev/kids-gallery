'use client';

import { useCartStore } from '@/store/cartStore';
import type { CartItemLocal } from '@/store/cartStore';

export function useCart() {
  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } =
    useCartStore();

  return {
    items,
    addItem: (item: CartItemLocal) => addItem(item),
    removeItem: (productId: string, variantId?: string) => removeItem(productId, variantId),
    updateQuantity: (productId: string, qty: number, variantId?: string) =>
      updateQuantity(productId, qty, variantId),
    clearCart,
    totalItems: totalItems(),
    totalPrice: totalPrice(),
  };
}
