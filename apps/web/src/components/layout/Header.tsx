'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Category } from '@/lib/services';

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Pick top 5 categories for the nav, or just use them all if < 5
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
          <Link href="/cart" className="scale-105 active:scale-95 transition-transform text-[#ae2f34]">
            <span className="material-symbols-outlined">shopping_cart</span>
          </Link>
          <Link href="/wishlist" className="scale-105 active:scale-95 transition-transform text-[#ae2f34]">
            <span className="material-symbols-outlined">favorite</span>
          </Link>
          <Link href="/auth/login" className="scale-105 active:scale-95 transition-transform text-[#ae2f34]">
            <span className="material-symbols-outlined">person</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
