'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import apiClient from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParams = searchParams?.get('redirect');
  const redirectUrl = redirectParams ? decodeURIComponent(redirectParams) : '/';

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);

  // Redirect if already logged in
  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.replace(redirectUrl);
    }
  }, [hasHydrated, isAuthenticated, router, redirectUrl]);

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const fetchCart = useCartStore((state) => state.fetchCart);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError('Phone number is required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await apiClient.post('/auth/send-otp', { phone });
      setStep('OTP');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError('OTP is required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await apiClient.post('/auth/verify-otp', { phone, otp });
      const { user, token } = res.data.data;
      
      setAuth(user, token);

      // Sync Cart
      if (cartItems.length > 0) {
        try {
          const syncPayload = cartItems.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity
          }));
          // We must send token since state might not be persisted yet
          await apiClient.post('/cart/sync', { items: syncPayload }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          clearCart(); // clear local cart
        } catch (syncErr) {
          console.warn('Failed to sync cart:', syncErr);
        }
      } else {
        // Even if local cart is empty, fetch existing user cart
        try {
          await fetchCart();
        } catch (fetchErr) {
          console.warn('Failed to fetch cart:', fetchErr);
        }
      }

      router.push(redirectUrl);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {step === 'PHONE' ? 'Sign In or Sign Up' : 'Verify OTP'}
      </h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      {step === 'PHONE' ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="flex-1 block w-full border-gray-300 rounded-none rounded-r-md sm:text-sm p-3 border outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="9876543210"
                maxLength={10}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || phone.length !== 10}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Get OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP sent to +91 {phone}
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="block w-full border-gray-300 rounded-md sm:text-sm p-3 border outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="123456"
              maxLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading || otp.length < 4}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
          
          <button
            type="button"
            onClick={() => setStep('PHONE')}
            className="w-full text-sm text-indigo-600 hover:text-indigo-500 mt-4"
          >
            Change Phone Number
          </button>
        </form>
      )}
    </div>
  );
}
