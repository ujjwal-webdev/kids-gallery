import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';

export const metadata = { title: 'Cart' };

export default function CartPage() {
  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      <div className="flex gap-8">
        <div className="flex-1 space-y-4">
          {/* TODO: Render cart items */}
          <p className="text-gray-500">Your cart is empty.</p>
        </div>
        <aside className="w-80 shrink-0">
          <CartSummary />
        </aside>
      </div>
    </div>
  );
}
