'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

const FREE_DELIVERY_THRESHOLD = 499;
const DELIVERY_CHARGE = 49;

export function CartSummary() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());

  const deliveryCharge = totalPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const total = totalPrice + deliveryCharge;
  const amountToFreeDelivery = FREE_DELIVERY_THRESHOLD - totalPrice;

  if (items.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5 shadow-sm sticky top-28">
      <h3 className="font-bold text-xl text-on-surface">Order Summary</h3>

      {/* Item count */}
      <p className="text-sm text-secondary">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>

      {/* Price breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-on-surface">₹{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery</span>
          <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : 'text-on-surface'}`}>
            {deliveryCharge === 0 ? 'FREE ✨' : `₹${deliveryCharge}`}
          </span>
        </div>

        {/* Free delivery progress */}
        {deliveryCharge > 0 && (
          <div className="bg-green-50 rounded-xl p-3 text-xs text-green-700">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="material-symbols-outlined text-[14px]">local_shipping</span>
              <span>Add <strong>₹{amountToFreeDelivery}</strong> more for FREE delivery!</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-green-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalPrice / FREE_DELIVERY_THRESHOLD) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg">
          <span className="text-on-surface">Total</span>
          <span className="text-primary">₹{total}</span>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/checkout"
        className="block w-full bg-primary text-on-primary font-bold text-center py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md text-base"
      >
        Proceed to Checkout →
      </Link>

      {/* Trust badges */}
      <div className="flex justify-center gap-6 pt-2 text-[10px] text-gray-400 uppercase tracking-wider">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          Secure
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">verified_user</span>
          Safe
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">replay</span>
          Returns
        </span>
      </div>
    </div>
  );
}
