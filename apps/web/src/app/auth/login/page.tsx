import { Suspense } from 'react';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = { title: 'Login | Kid\'s Gallery' };

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
