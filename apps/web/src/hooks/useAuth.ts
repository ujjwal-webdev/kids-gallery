'use client';

import { useState, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/lib/api';
import { User } from '@kids-gallery/shared';

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendOtp = useCallback(async (phone: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await apiClient.post('/auth/send-otp', { phone });
      return true;
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Failed to send OTP';
      setError(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyOtp = useCallback(async (phone: string, otp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiClient.post('/auth/verify-otp', { phone, otp });
      const { user: u, token: t } = res.data.data as { user: User; token: string };
      setAuth(u, t);
      return true;
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Invalid OTP';
      setError(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setAuth]);

  return { user, token, isAuthenticated, isLoading, error, sendOtp, verifyOtp, logout };
}
