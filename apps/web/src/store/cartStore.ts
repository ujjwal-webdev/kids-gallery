import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItemLocal {
  productId: string;
  name: string;
  price: number;
  mrp: number;
  image?: string;
  quantity: number;
  variantId?: string;
  variantName?: string;
}

interface CartState {
  items: CartItemLocal[];
  addItem: (item: CartItemLocal) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  fetchCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.variantId === item.variantId,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId),
          ),
        })),
      updateQuantity: (productId, quantity, variantId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity }
              : i,
          ),
        })),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      fetchCart: async () => {
        try {
          // Dynamic import of apiClient to avoid circular dependencies if any,
          // but we can just use window fetch or import apiClient
          const { default: apiClient } = await import('@/lib/api');
          const res = await apiClient.get('/cart');
          if (res.data?.data?.items) {
            const remoteItems = res.data.data.items.map((item: any) => ({
              productId: item.productId,
              name: item.product.name,
              price: item.product.price,
              mrp: item.product.mrp,
              image: item.product.images?.[0],
              quantity: item.quantity,
              variantId: item.variantId,
              variantName: item.variant?.name,
            }));
            set({ items: remoteItems });
          }
        } catch (err) {
          console.error('Failed to fetch remote cart:', err);
        }
      },
    }),
    { name: 'cart-store' },
  ),
);
