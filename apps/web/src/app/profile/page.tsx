import { Suspense } from 'react';
import { ProfilePageContent } from '@/components/profile/ProfilePageContent';

export const metadata = { title: "My Profile | Kid's Gallery" };

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fff9eb]" />}>
      <ProfilePageContent />
    </Suspense>
  );
}
