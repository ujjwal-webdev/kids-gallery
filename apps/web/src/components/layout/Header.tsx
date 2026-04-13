'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Category } from '@/lib/services';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';
import apiClient from '@/lib/api';

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  sellingPrice: string;
  images?: Array<{ url: string; altText?: string }>;
}

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
  const wishlistItemCount = useWishlistStore((s) => s.items.size);

  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setSearchLoading(true);
    try {
      const res = await apiClient.get(`/products/search`, { params: { q, limit: 5 } });
      const data = res.data?.data || [];
      setSuggestions(data);
      setShowSuggestions(data.length > 0);
    } catch {
      setSuggestions([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
          {/* Search Bar */}
          <div className="hidden lg:block relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-surface-container-lowest rounded-full px-4 py-2 shadow-sm w-[260px]">
              <button type="submit" className="mr-2 text-secondary hover:text-primary transition-colors flex-shrink-0">
                <span className="material-symbols-outlined">search</span>
              </button>
              <div className="relative flex-1">
                <input 
                  className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium outline-none pr-6" 
                  placeholder="Search treasures..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setSuggestions([]); setShowSuggestions(false); }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-scale-in origin-top min-w-[320px]">
                {searchLoading ? (
                  <div className="px-4 py-3 text-sm text-secondary text-center">Searching...</div>
                ) : (
                  <>
                    {suggestions.map((item) => (
                      <Link
                        key={item.id}
                        href={`/products/${item.slug}`}
                        onClick={() => { setShowSuggestions(false); setSearchQuery(''); }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex-shrink-0 overflow-hidden flex items-center justify-center">
                          {item.images?.[0]?.url ? (
                            <img src={item.images[0].url} alt={item.name} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-lg">🎁</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-on-surface truncate">{item.name}</p>
                          <p className="text-xs font-bold text-primary">₹{item.sellingPrice}</p>
                        </div>
                      </Link>
                    ))}
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full px-4 py-2.5 text-sm font-bold text-primary hover:bg-primary/5 transition-colors text-center border-t border-gray-100"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <Link href="/cart" className="relative scale-105 active:scale-95 transition-transform text-[#ae2f34]">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ae2f34] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce-once">
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </Link>
          <Link href="/wishlist" className="relative scale-105 active:scale-95 transition-transform text-[#ae2f34]">
            <span className="material-symbols-outlined">favorite</span>
            {wishlistItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ae2f34] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce-once">
                {wishlistItemCount > 9 ? '9+' : wishlistItemCount}
              </span>
            )}
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
