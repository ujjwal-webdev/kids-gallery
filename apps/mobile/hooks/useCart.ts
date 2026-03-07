import { useCartStore } from '../store/cartStore';

export function useCart() {
  const { items, addItem, removeItem, clearCart } = useCartStore();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return { items, addItem, removeItem, clearCart, totalItems, totalPrice };
}
