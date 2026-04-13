import { Suspense } from 'react';
import { WishlistPageContent } from '@/components/wishlist/WishlistPageContent';

export const metadata = { title: 'My Wishlist | Kid\'s Gallery' };

export default function WishlistPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#fff9eb]">
      <Suspense fallback={<div className="min-h-screen bg-[#fff9eb]" />}>
        <WishlistPageContent />
      </Suspense>
    </div>
  );
}
