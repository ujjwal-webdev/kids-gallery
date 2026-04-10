'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Category } from '@/lib/services';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const cartItemCount = useCartStore((s) => s.totalItems());
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    router.push('/');
  };

  const navCategories = categories.slice(0, 5);

  return (
    <header className="w-full sticky top-0 z-50 bg-[#fff9eb] shadow-[0_32px_64px_rgba(29,28,19,0.05)]">
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 max-w-[1440px] mx-auto">
        <Link href="/" className="text-4xl font-display font-medium tracking-wide flex items-baseline">
          <span className="text-primary hover:-translate-y-1 transition-transform">K</span>
          <span className="text-secondary-fixed-dim hover:-translate-y-1 transition-transform delay-75">i</span>
          <span className="text-tertiary-fixed-dim hover:-translate-y-1 transition-transform delay-100">d</span>
          <span className="text-primary hover:-translate-y-1 transition-transform delay-150">'</span>
          <span className="text-tertiary-fixed-dim hover:-translate-y-1 transition-transform delay-200">s</span>
          <span className="text-transparent">&nbsp;</span>
          <span className="text-tertiary-fixed-dim hover:-translate-y-1 transition-transform">G</span>
          <span className="text-primary hover:-translate-y-1 transition-transform delay-75">a</span>
          <span className="text-secondary hover:-translate-y-1 transition-transform delay-100">l</span>
          <span className="text-primary hover:-translate-y-1 transition-transform delay-150">l</span>
          <span className="text-secondary hover:-translate-y-1 transition-transform delay-200">e</span>
          <span className="text-primary hover:-translate-y-1 transition-transform delay-300">r</span>
          <span className="text-tertiary-fixed-dim hover:-translate-y-1 transition-transform delay-[400ms]">y</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navCategories.map((cat) => {
            const isProductsRoute = pathname === '/products';
            const isCurrentCategory = searchParams.get('category') === cat.slug;
            const isActive = isProductsRoute && isCurrentCategory;

            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className={
                  isActive
                    ? "text-[#ae2f34] border-b-4 border-[#ae2f34] pb-1 font-bold tracking-tight hover:text-[#ae2f34] transition-colors duration-300"
                    : "text-[#785900] font-medium tracking-tight hover:text-[#ae2f34] transition-colors duration-300"
                }
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-surface-container-lowest rounded-full px-4 py-2 shadow-sm">
            <span className="material-symbols-outlined text-secondary mr-2">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm w-48 font-medium outline-none" 
              placeholder="Search treasures..." 
              type="text"
            />
          </div>
          <Link href="/cart" className="relative scale-105 active:scale-95 transition-transform text-[#ae2f34]">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ae2f34] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce-once">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </Link>
          <Link href="/wishlist" className="scale-105 active:scale-95 transition-transform text-[#ae2f34]">
            <span className="material-symbols-outlined">favorite</span>
          </Link>

          {/* Profile / Auth */}
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="scale-105 active:scale-95 transition-transform text-[#ae2f34] flex items-center gap-1"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-scale-in origin-top-right">
                  {/* User greeting */}
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="text-sm font-bold text-on-surface truncate">{user?.name || 'Hey there!'}</p>
                    <p className="text-xs text-secondary truncate">{user?.phone}</p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">person</span>
                    My Profile
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">shopping_bag</span>
                    My Orders
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">favorite</span>
                    Wishlist
                  </Link>

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login" className="scale-105 active:scale-95 transition-transform text-[#ae2f34]">
              <span className="material-symbols-outlined">person</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

