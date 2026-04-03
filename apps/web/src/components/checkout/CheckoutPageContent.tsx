'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/lib/api';
import { OrderSuccess } from './OrderSuccess';

const FREE_DELIVERY_THRESHOLD = 499;
const DELIVERY_CHARGE = 49;

interface FormData {
  name: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  phone: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
};

export function CheckoutPageContent() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [apiError, setApiError] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Route Guard
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login?redirect=/checkout');
    }
  }, [isAuthenticated, router]);

  const deliveryCharge = totalPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const total = totalPrice + deliveryCharge;

  if (!isAuthenticated) return <div className="min-h-screen bg-gray-50" />;

  // Redirect if cart is empty and order not placed
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-7xl mb-6">😅</div>
        <h1 className="text-3xl font-black text-on-surface mb-3">Nothing to checkout</h1>
        <p className="text-secondary text-lg mb-8">Your cart is empty. Add some treasures first!</p>
        <Link
          href="/products"
          className="bg-primary text-on-primary font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-md"
        >
          Browse Products →
        </Link>
      </div>
    );
  }

  // Show success screen
  if (orderPlaced) {
    return <OrderSuccess orderId={orderId} />;
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim() || form.phone.length < 10) newErrors.phone = 'Valid phone number required';
    if (!form.email.trim() || !form.email.includes('@')) newErrors.email = 'Valid email required';
    if (!form.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';
    if (!form.pincode.trim() || form.pincode.length < 6) newErrors.pincode = 'Valid pincode required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setIsPlacing(true);
    setApiError('');

    try {
      // 1. Create or save address
      const addressRes = await apiClient.post('/users/addresses', {
        name: form.name,
        phone: form.phone,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2 || undefined,
        city: form.city,
        state: form.state,
        pinCode: form.pincode,
        type: 'HOME',
        isDefault: true,
      });

      const addressId = addressRes.data.data.id;

      // 2. Create the Order
      const orderRes = await apiClient.post('/orders', {
        addressId,
        paymentMethod: 'COD',
      });

      setOrderId(orderRes.data.data.orderNumber);
      clearCart();
      setOrderPlaced(true);
    } catch (err: any) {
      setApiError(err.response?.data?.message || err.message || 'Network error. Please try again.');
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center gap-1 text-primary font-medium hover:underline text-sm mb-4">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Cart
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface">Checkout</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Shipping Form */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              Shipping Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Full Name" value={form.name} error={errors.name} onChange={(v) => handleChange('name', v)} placeholder="John Doe" />
              <InputField label="Phone" value={form.phone} error={errors.phone} onChange={(v) => handleChange('phone', v)} placeholder="9876543210" type="tel" />
              <div className="sm:col-span-2">
                <InputField label="Email" value={form.email} error={errors.email} onChange={(v) => handleChange('email', v)} placeholder="john@example.com" type="email" />
              </div>
              <div className="sm:col-span-2">
                <InputField label="Address Line 1" value={form.addressLine1} error={errors.addressLine1} onChange={(v) => handleChange('addressLine1', v)} placeholder="House no., Building, Street" />
              </div>
              <div className="sm:col-span-2">
                <InputField label="Address Line 2 (Optional)" value={form.addressLine2} onChange={(v) => handleChange('addressLine2', v)} placeholder="Landmark, Area" />
              </div>
              <InputField label="City" value={form.city} error={errors.city} onChange={(v) => handleChange('city', v)} placeholder="Mumbai" />
              <InputField label="State" value={form.state} error={errors.state} onChange={(v) => handleChange('state', v)} placeholder="Maharashtra" />
              <InputField label="Pincode" value={form.pincode} error={errors.pincode} onChange={(v) => handleChange('pincode', v)} placeholder="400001" type="text" />
            </div>

            {/* Payment method */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Payment Method
              </h2>
              <div className="bg-surface-container rounded-xl p-4 flex items-center gap-3 border-2 border-primary/30">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface text-sm">Cash on Delivery</p>
                  <p className="text-xs text-secondary">Pay when your order arrives</p>
                </div>
                <span className="material-symbols-outlined text-primary ml-auto">check_circle</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">More payment options coming soon (UPI, Card, Net Banking)</p>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <aside className="w-full lg:w-96 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-28 space-y-5">
            <h3 className="font-bold text-xl text-on-surface">Order Summary</h3>

            {/* Compact item list */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId || ''}`} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center text-xl shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    ) : '🎁'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-on-surface truncate">{item.name}</p>
                    <p className="text-xs text-secondary">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-on-surface shrink-0">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="font-semibold">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : ''}`}>
                  {deliveryCharge === 0 ? 'FREE ✨' : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{total}</span>
              </div>
            </div>

            {/* API error */}
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0">error</span>
                <span>{apiError}</span>
              </div>
            )}

            {/* Place Order button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isPlacing}
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPlacing ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  Placing Order...
                </>
              ) : (
                `Place Order — ₹${total}`
              )}
            </button>

            <div className="flex justify-center gap-6 text-[10px] text-gray-400 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Secure
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                Safe
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* Reusable input field */
function InputField({
  label,
  value,
  error,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-on-surface mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none transition-all bg-surface-container-lowest ${
          error
            ? 'border-red-400 focus:ring-2 focus:ring-red-200'
            : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
