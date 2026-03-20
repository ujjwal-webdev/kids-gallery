'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Art Supplies', href: '/categories/art-supplies' },
    { name: 'Toys', href: '/categories/toys' },
    { name: 'Decor', href: '/categories/decor' },
    { name: 'Books', href: '/categories/books' },
    { name: 'Gifts', href: '/categories/gifts' }
  ];

  return (
    <header className="bg-[#fcfaf8] sticky top-0 z-50 py-4">
      <div className="container-page">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#ae2f34] tracking-tight">
            Kid's Gallery
          </Link>
          
          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={
                    isActive
                      ? "text-[#1a1a1a] text-sm font-semibold relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[2px] after:bg-[#ae2f34]"
                      : "text-[#5a5a5a] hover:text-[#ae2f34] text-sm font-medium transition-colors"
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center gap-6">
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-64 shadow-sm border border-gray-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search treasures..." 
                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
              />
            </div>
            
            {/* Icons */}
            <div className="flex items-center gap-4 text-[#ae2f34]">
              <Link href="/cart" aria-label="Cart" className="hover:text-[#8e2429] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </Link>
              <Link href="/wishlist" aria-label="Wishlist" className="hover:text-[#8e2429] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </Link>
              <Link href="/auth/login" aria-label="Profile" className="hover:text-[#8e2429] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </header>
  );
}
