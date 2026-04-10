import { Suspense } from 'react';
import { OrderDetailContent } from '@/components/orders/OrderDetailContent';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fff9eb]" />}>
      <OrderDetailContent orderId={id} />
    </Suspense>
  );
}
