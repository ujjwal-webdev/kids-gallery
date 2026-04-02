'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';

export function CartPageContent() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-8xl mb-6 animate-bounce">🛒</div>
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface mb-3">Your cart is empty</h1>
        <p className="text-secondary text-lg mb-8 max-w-md">
          Looks like you haven't added any treasures yet. Explore our curated collection and find something wonderful!
        </p>
        <Link
          href="/products"
          className="bg-primary text-on-primary font-bold px-8 py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md text-base"
        >
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-on-surface">Shopping Cart</h1>
          <p className="text-secondary mt-1">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
          Clear All
        </button>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Item list */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <CartItem key={`${item.productId}-${item.variantId || 'default'}`} item={item} />
          ))}

          {/* Continue shopping */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline mt-4"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary sidebar */}
        <aside className="w-full lg:w-96 shrink-0">
          <CartSummary />
        </aside>
      </div>
    </div>
  );
}
