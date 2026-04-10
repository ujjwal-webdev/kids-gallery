import { Suspense } from 'react';
import { OrdersPageContent } from '@/components/orders/OrdersPageContent';

export const metadata = { title: "My Orders | Kid's Gallery" };

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fff9eb]" />}>
      <OrdersPageContent />
    </Suspense>
  );
}
