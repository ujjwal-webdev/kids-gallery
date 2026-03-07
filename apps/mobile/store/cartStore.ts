import { create } from 'zustand';

interface CartItem { productId: string; name: string; price: number; quantity: number; }

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  addItem: (item) => set((s) => {
    const ex = s.items.find((i) => i.productId === item.productId);
    if (ex) return { items: s.items.map((i) => i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i) };
    return { items: [...s.items, item] };
  }),
  removeItem: (productId) => set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
  clearCart: () => set({ items: [] }),
}));
