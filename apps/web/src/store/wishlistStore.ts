import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '@/lib/api';

interface WishlistStore {
  items: Set<string>;
  initialized: boolean;
  _fetchPromise: Promise<void> | null;
  fetchWishlist: () => Promise<void>;
  toggleItem: (productId: string) => Promise<boolean>;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: new Set(),
      initialized: false,
      _fetchPromise: null,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      clearWishlist: () => set({ items: new Set(), initialized: false, _fetchPromise: null }),

      fetchWishlist: async () => {
        const state = get();
        if (state.initialized) return; // already fetched
        if (state._fetchPromise) return state._fetchPromise; // already fetching

        const promise = (async () => {
          try {
            const res = await apiClient.get('/wishlist?limit=1000');
            const wishlist = res.data?.data || [];
            const ids = new Set<string>(wishlist.map((item: any) => item.productId));
            set({ items: ids, initialized: true, _fetchPromise: null });
          } catch {
            set({ _fetchPromise: null });
            // silently fail
          }
        })();

        set({ _fetchPromise: promise });
        return promise;
      },

      toggleItem: async (productId) => {
        const { items } = get();
        const newItems = new Set(items);
        const isCurrentlyWishlisted = items.has(productId);

        // Optimistic update
        if (isCurrentlyWishlisted) newItems.delete(productId);
        else newItems.add(productId);
        set({ items: newItems });

        try {
          const res = await apiClient.post(`/wishlist/${productId}`);
          const isNowWishlisted = res.data?.data?.wishlisted || false;
          
          if (isNowWishlisted !== !isCurrentlyWishlisted) {
            const corrected = new Set(get().items);
            if (isNowWishlisted) corrected.add(productId);
            else corrected.delete(productId);
            set({ items: corrected });
          }
          return isNowWishlisted;
        } catch {
          // Revert optimistic update
          set({ items });
          return isCurrentlyWishlisted;
        }
      },
    }),
    {
      name: 'wishlist-storage',
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      },
      partialize: (state) => ({ items: Array.from(state.items) }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        items: new Set(persistedState?.items || []),
      }),
    }
  )
);
