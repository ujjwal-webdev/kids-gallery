'use client';

import { Button } from '@/components/ui/Button';

interface CartSummaryProps {
  subtotal?: number;
  deliveryCharge?: number;
  discount?: number;
}

export function CartSummary({ subtotal = 0, deliveryCharge = 49, discount = 0 }: CartSummaryProps) {
  const total = subtotal + deliveryCharge - discount;
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
      <h3 className="font-semibold text-lg">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
        <div className="flex justify-between"><span>Delivery</span><span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span></div>
        {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount}</span></div>}
        <div className="flex justify-between font-bold text-base border-t pt-2"><span>Total</span><span>₹{total}</span></div>
      </div>
      <Button className="w-full" size="lg">Proceed to Checkout</Button>
    </div>
  );
}
