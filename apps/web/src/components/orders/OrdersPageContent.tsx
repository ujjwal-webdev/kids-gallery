'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/lib/api';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface OrderItem {
  id: string;
  productName: string;
  variantName?: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  product?: {
    images?: Array<{ url: string }>;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: string;
  createdAt: string;
  items: OrderItem[];
}

export function OrdersPageContent() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Auth guard — wait for Zustand to rehydrate before deciding
  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace('/auth/login?redirect=/orders');
    }
  }, [hasHydrated, isAuthenticated, router]);

  const fetchOrders = useCallback(async (pageNum: number, append = false) => {
    try {
      if (append) setLoadingMore(true); else setLoading(true);
      const res = await apiClient.get(`/orders?page=${pageNum}&limit=10`);
      const { data, total, limit } = res.data;
      if (append) {
        setOrders((prev) => [...prev, ...data]);
      } else {
        setOrders(data);
      }
      setHasMore(pageNum * limit < total);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    if (hasHydrated && isAuthenticated) fetchOrders(1);
  }, [hasHydrated, isAuthenticated, fetchOrders]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchOrders(nextPage, true);
  };

  if (!hasHydrated || !isAuthenticated) return <div className="min-h-screen bg-[#fff9eb]" />;

  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface mb-8">My Orders</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
              <div className="flex justify-between mb-4">
                <div className="h-5 bg-gray-200 rounded w-32" />
                <div className="h-5 bg-gray-200 rounded w-20" />
              </div>
              <div className="flex gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-48 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-24" />
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-28" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface mb-8">My Orders</h1>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <span className="material-symbols-outlined text-red-400 text-[48px] mb-4 block">error</span>
          <p className="text-red-700 font-medium mb-4">{error}</p>
          <button onClick={() => fetchOrders(1)} className="text-primary font-bold hover:underline">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (orders.length === 0) {
    return (
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface mb-8">My Orders</h1>
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
          <div className="text-7xl mb-6 animate-scale-in">📦</div>
          <h2 className="text-2xl font-bold text-on-surface mb-2">No orders yet</h2>
          <p className="text-secondary text-lg mb-8 max-w-sm">
            When you place an order, it will show up here. Let's find something amazing!
          </p>
          <Link
            href="/products"
            className="bg-primary text-on-primary font-bold px-8 py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
          >
            Start Shopping →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-black text-on-surface mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="block bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            {/* Top row: order number + status */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <span className="font-mono font-bold text-on-surface text-sm">{order.orderNumber}</span>
                <span className="text-secondary text-xs ml-2">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <StatusBadge status={order.status} />
            </div>

            {/* Item previews */}
            <div className="space-y-2 mb-4">
              {order.items.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-surface-container-high rounded-lg flex items-center justify-center text-lg shrink-0 overflow-hidden">
                    {item.product?.images?.[0]?.url ? (
                      <img src={item.product.images[0].url} alt={item.productName} className="w-full h-full object-contain" />
                    ) : (
                      '🎁'
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-on-surface truncate">{item.productName}</p>
                    <p className="text-xs text-secondary">
                      Qty: {item.quantity}
                      {item.variantName && ` · ${item.variantName}`}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-on-surface shrink-0">₹{parseFloat(item.totalPrice).toFixed(0)}</span>
                </div>
              ))}
              {order.items.length > 2 && (
                <p className="text-xs text-secondary pl-14">+{order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}</p>
              )}
            </div>

            {/* Bottom row: total + arrow */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="font-bold text-on-surface">
                Total: <span className="text-primary">₹{parseFloat(order.totalAmount).toFixed(0)}</span>
              </span>
              <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-[20px]">
                arrow_forward
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="bg-white border border-gray-200 text-on-surface font-semibold px-8 py-3 rounded-xl hover:border-primary hover:text-primary transition-all disabled:opacity-50"
          >
            {loadingMore ? (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                Loading...
              </span>
            ) : (
              'Load More Orders'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
