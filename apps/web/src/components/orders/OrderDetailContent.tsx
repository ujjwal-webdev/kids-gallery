'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/lib/api';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface OrderItemData {
  id: string;
  productId: string;
  productName: string;
  variantName?: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  gstRate: string;
  gstAmount: string;
  product?: { images?: Array<{ url: string }> };
}

interface StatusHistoryEntry {
  id: string;
  status: string;
  note?: string;
  createdAt: string;
}

interface AddressData {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
}

interface PaymentData {
  status: string;
  amount: string;
}

interface OrderDetail {
  id: string;
  orderNumber: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  subtotal: string;
  deliveryCharge: string;
  taxAmount: string;
  discount: string;
  totalAmount: string;
  couponCode?: string;
  deliveryNotes?: string;
  createdAt: string;
  items: OrderItemData[];
  address: AddressData;
  payment?: PaymentData;
  statusHistory: StatusHistoryEntry[];
}

/* The canonical order of statuses for the timeline */
const STATUS_ORDER = ['PENDING', 'CONFIRMED', 'PROCESSING', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Order Placed',
  CONFIRMED: 'Confirmed',
  PROCESSING: 'Processing',
  PACKED: 'Packed',
  SHIPPED: 'Shipped',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  RETURN_REQUESTED: 'Return Requested',
  RETURNED: 'Returned',
  REFUNDED: 'Refunded',
};

interface OrderDetailContentProps {
  orderId: string;
}

export function OrderDetailContent({ orderId }: OrderDetailContentProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace(`/auth/login?redirect=/orders/${orderId}`);
    }
  }, [hasHydrated, isAuthenticated, router, orderId]);

  useEffect(() => {
    if (!hasHydrated || !isAuthenticated) return;
    (async () => {
      try {
        const res = await apiClient.get(`/orders/${orderId}`);
        setOrder(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    })();
  }, [hasHydrated, isAuthenticated, orderId]);

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    setCancelling(true);
    try {
      await apiClient.put(`/orders/${orderId}/cancel`);
      // Refresh order data
      const res = await apiClient.get(`/orders/${orderId}`);
      setOrder(res.data.data);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  if (!hasHydrated || !isAuthenticated) return <div className="min-h-screen bg-[#fff9eb]" />;

  if (loading) {
    return (
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-40" />
          <div className="h-10 bg-gray-200 rounded w-64" />
          <div className="bg-white rounded-2xl p-6 space-y-4">
            <div className="h-5 bg-gray-200 rounded w-48" />
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <span className="material-symbols-outlined text-red-400 text-[48px] mb-4 block">error</span>
          <p className="text-red-700 font-medium mb-4">{error || 'Order not found'}</p>
          <Link href="/orders" className="text-primary font-bold hover:underline">← Back to Orders</Link>
        </div>
      </div>
    );
  }

  const canCancel = ['PENDING', 'CONFIRMED'].includes(order.status);
  const isCancelled = order.status === 'CANCELLED';

  // Build timeline data
  const historyMap = new Map<string, StatusHistoryEntry>();
  for (const entry of order.statusHistory) {
    historyMap.set(entry.status, entry);
  }

  const currentStatusIndex = STATUS_ORDER.indexOf(order.status);

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Back link */}
      <Link href="/orders" className="inline-flex items-center gap-1 text-primary font-medium hover:underline text-sm mb-6">
        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
        Back to Orders
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface mb-1">{order.orderNumber}</h1>
          <p className="text-secondary text-sm">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'long', year: 'numeric',
            })} at {new Date(order.createdAt).toLocaleTimeString('en-IN', {
              hour: '2-digit', minute: '2-digit',
            })}
          </p>
        </div>
        <StatusBadge status={order.status} size="md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Timeline */}
          {!isCancelled && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-lg text-on-surface mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">timeline</span>
                Order Progress
              </h2>
              <div className="flex items-center justify-between relative">
                {/* Progress bar background */}
                <div className="absolute top-4 left-6 right-6 h-1 bg-gray-200 rounded-full" />
                {/* Progress bar fill */}
                <div
                  className="absolute top-4 left-6 h-1 bg-primary rounded-full transition-all duration-700"
                  style={{
                    width: currentStatusIndex >= 0
                      ? `calc(${(currentStatusIndex / (STATUS_ORDER.length - 1)) * 100}% - 48px)`
                      : '0%',
                  }}
                />
                {STATUS_ORDER.map((status, idx) => {
                  const isComplete = currentStatusIndex >= idx;
                  const isCurrent = currentStatusIndex === idx;
                  const entry = historyMap.get(status);
                  return (
                    <div key={status} className="relative flex flex-col items-center z-10" style={{ width: `${100 / STATUS_ORDER.length}%` }}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                          isComplete
                            ? 'bg-primary text-on-primary shadow-md'
                            : 'bg-gray-200 text-gray-400'
                        } ${isCurrent ? 'ring-4 ring-primary/20 scale-110' : ''}`}
                      >
                        {isComplete ? (
                          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <span className={`text-[10px] mt-2 text-center leading-tight font-medium ${isComplete ? 'text-on-surface' : 'text-gray-400'}`}>
                        {STATUS_LABELS[status]?.split(' ').slice(0, 2).join(' ') || status}
                      </span>
                      {entry && (
                        <span className="text-[9px] text-secondary mt-0.5">
                          {new Date(entry.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cancelled notice */}
          {isCancelled && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-4">
              <span className="material-symbols-outlined text-red-500 text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
              <div>
                <p className="font-bold text-red-700">This order was cancelled</p>
                {historyMap.get('CANCELLED') && (
                  <p className="text-red-600 text-sm">
                    on {new Date(historyMap.get('CANCELLED')!.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                    {historyMap.get('CANCELLED')!.note && ` — ${historyMap.get('CANCELLED')!.note}`}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Items */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-lg text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">shopping_bag</span>
              Items ({order.items.length})
            </h2>
            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <Link href={`/products/${item.productId}`} className="shrink-0">
                    <div className="w-16 h-16 bg-surface-container-high rounded-xl flex items-center justify-center text-2xl overflow-hidden hover:opacity-80 transition-opacity">
                      {item.product?.images?.[0]?.url ? (
                        <img src={item.product.images[0].url} alt={item.productName} className="w-full h-full object-contain" />
                      ) : (
                        '🎁'
                      )}
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.productId}`} className="text-sm font-semibold text-on-surface hover:text-primary transition-colors truncate block">
                      {item.productName}
                    </Link>
                    {item.variantName && <p className="text-xs text-secondary">{item.variantName}</p>}
                    <p className="text-xs text-secondary">
                      ₹{parseFloat(item.unitPrice).toFixed(0)} × {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-on-surface shrink-0">₹{parseFloat(item.totalPrice).toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Price Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-on-surface mb-4">Price Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{parseFloat(order.subtotal).toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className={`font-semibold ${parseFloat(order.deliveryCharge) === 0 ? 'text-green-600' : ''}`}>
                  {parseFloat(order.deliveryCharge) === 0 ? 'FREE ✨' : `₹${parseFloat(order.deliveryCharge).toFixed(0)}`}
                </span>
              </div>
              {parseFloat(order.taxAmount) > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST)</span>
                  <span className="font-semibold">₹{parseFloat(order.taxAmount).toFixed(0)}</span>
                </div>
              )}
              {parseFloat(order.discount) > 0 && (
                <div className="flex justify-between">
                  <span className="text-green-600">Discount {order.couponCode && `(${order.couponCode})`}</span>
                  <span className="font-semibold text-green-600">-₹{parseFloat(order.discount).toFixed(0)}</span>
                </div>
              )}
              <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-primary">₹{parseFloat(order.totalAmount).toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
              Shipping Address
            </h3>
            <div className="text-sm text-gray-700 space-y-0.5">
              <p className="font-semibold text-on-surface">{order.address.name}</p>
              <p>{order.address.addressLine1}</p>
              {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
              <p>{order.address.city}, {order.address.state} — {order.address.pinCode}</p>
              <p className="text-secondary mt-1">📞 {order.address.phone}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-lg text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
              Payment
            </h3>
            <div className="text-sm space-y-1">
              <p className="font-semibold">{order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}</p>
              <StatusBadge status={order.paymentStatus} />
            </div>
          </div>

          {/* Delivery Notes */}
          {order.deliveryNotes && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-sm text-on-surface mb-2">Delivery Notes</h3>
              <p className="text-sm text-gray-600">{order.deliveryNotes}</p>
            </div>
          )}

          {/* Cancel button */}
          {canCancel && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="w-full border-2 border-red-300 text-red-600 font-bold py-3 rounded-xl hover:bg-red-50 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {cancelling ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  Cancelling...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                  Cancel Order
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
