'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Art Supplies', href: '/products' },
    { name: 'Toys', href: '/products' },
    { name: 'Decor', href: '/products' },
    { name: 'Books', href: '/products' },
    { name: 'Gifts', href: '/products' }
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-[#fff9eb] shadow-[0_32px_64px_rgba(29,28,19,0.05)]">
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 max-w-[1440px] mx-auto">
        <Link href="/" className="text-3xl font-black text-[#ae2f34] tracking-tighter">
          Kid's Gallery
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={
                  isActive
                    ? "text-[#ae2f34] border-b-4 border-[#ae2f34] pb-1 font-bold tracking-tight hover:text-[#ae2f34] transition-colors duration-300"
                    : "text-[#785900] font-medium tracking-tight hover:text-[#ae2f34] transition-colors duration-300"
                }
              >
                {link.name}
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
