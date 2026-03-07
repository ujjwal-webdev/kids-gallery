import { useAuthStore } from '../store/authStore';
import apiClient from '../lib/api';

export function useAuth() {
  const { user, token, setAuth, logout } = useAuthStore();

  const sendOtp = async (phone: string) => {
    await apiClient.post('/auth/send-otp', { phone });
  };

  const verifyOtp = async (phone: string, otp: string) => {
    const res = await apiClient.post('/auth/verify-otp', { phone, otp });
    const { user: u, token: t } = res.data.data;
    setAuth(u, t);
  };

  return { user, token, sendOtp, verifyOtp, logout };
}
