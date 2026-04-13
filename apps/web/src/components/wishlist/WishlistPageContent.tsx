'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';
import apiClient from '@/lib/api';

interface WishlistProduct {
  id: string;
  name: string;
  slug: string;
  sellingPrice: string;
  mrp: string;
  stock: number;
  images?: Array<{ url: string; altText?: string }>;
  category?: { id: string; name: string; slug: string };
}

interface WishlistItem {
  id: string;
  productId: string;
  createdAt: string;
  product: WishlistProduct;
}

export function WishlistPageContent() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Auth guard
  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace('/auth/login?redirect=/wishlist');
    }
  }, [hasHydrated, isAuthenticated, router]);

  const fetchWishlist = useCallback(async () => {
    try {
      const res = await apiClient.get('/wishlist?limit=50');
      setItems(res.data?.data || []);
      // Sync global store with the fetched items (optional but good for consistency)
      useWishlistStore.getState().fetchWishlist();
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasHydrated && isAuthenticated) fetchWishlist();
  }, [hasHydrated, isAuthenticated, fetchWishlist]);

  const handleRemove = async (productId: string) => {
    setRemovingId(productId);
    try {
      // Use global store method so that other components (like headers/buttons) stay in sync
      await useWishlistStore.getState().toggleItem(productId);
      setItems((prev) => prev.filter((item) => item.productId !== productId));
    } catch {
      // silently fail
    } finally {
      setRemovingId(null);
    }
  };

  if (!hasHydrated || !isAuthenticated) return <div className="min-h-screen bg-[#fff9eb]" />;

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="h-10 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-2xl mb-4" />
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-5 bg-gray-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface">My Wishlist</h1>
        {items.length > 0 && (
          <span className="bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-[80px] text-gray-300 mb-4 block">favorite_border</span>
          <h2 className="text-2xl font-bold text-on-surface mb-2">Your wishlist is empty</h2>
          <p className="text-secondary mb-8 max-w-md mx-auto">
            Start adding your favourite products and they'll show up here for easy access later.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[20px]">storefront</span>
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const product = item.product;
            const isRemoving = removingId === item.productId;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all ${
                  isRemoving ? 'opacity-50 scale-95' : 'hover:shadow-md'
                }`}
              >
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="aspect-square bg-surface-container-high flex items-center justify-center overflow-hidden">
                    {product.images?.[0]?.url ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-6xl">🎁</span>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                    {product.category?.name || 'Product'}
                  </span>
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-base font-bold text-on-surface mt-1 mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-xl font-black text-primary">₹{product.sellingPrice}</span>
                    {product.mrp && product.mrp !== product.sellingPrice && (
                      <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex-1 bg-primary text-white text-center text-sm font-bold py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleRemove(item.productId)}
                      disabled={isRemoving}
                      className="w-10 h-10 rounded-xl border border-red-200 text-red-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50"
                      aria-label="Remove from wishlist"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
