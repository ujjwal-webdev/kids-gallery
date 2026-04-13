'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';

interface WishlistButtonProps {
  productId: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function WishlistButton({ productId, size = 'sm', className = '' }: WishlistButtonProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydratedAuth = useAuthStore((s) => s._hasHydrated);
  
  const wishlistedItems = useWishlistStore((s) => s.items);
  const fetchWishlist = useWishlistStore((s) => s.fetchWishlist);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const hasHydratedWishlist = useWishlistStore((s) => s._hasHydrated);
  
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);

  const hasHydrated = hasHydratedAuth && hasHydratedWishlist;
  const wishlisted = wishlistedItems.has(productId);

  // Fetch wishlist on mount if authenticated and not yet fetched
  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      fetchWishlist().catch(() => {});
    }
  }, [hasHydrated, isAuthenticated, fetchWishlist]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push('/auth/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    if (loading) return;
    setLoading(true);
    setAnimating(true);

    try {
      await toggleItem(productId);
    } finally {
      setLoading(false);
      setTimeout(() => setAnimating(false), 400);
    }
  };

  const iconSize = size === 'sm' ? 'text-[20px]' : 'text-[24px]';
  const btnSize = size === 'sm'
    ? 'h-10 w-10'
    : 'h-12 w-12';

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`${btnSize} rounded-full flex items-center justify-center transition-all z-10 ${
        wishlisted
          ? 'bg-red-50 text-red-500 shadow-sm'
          : 'bg-white/80 backdrop-blur-md text-primary shadow-sm hover:bg-primary hover:text-white'
      } ${animating ? 'scale-125' : 'scale-100'} active:scale-95 disabled:opacity-70 ${className}`}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <span
        className={`material-symbols-outlined ${iconSize} transition-all ${animating ? 'animate-pulse' : ''}`}
        style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
      >
        favorite
      </span>
    </button>
  );
}
