'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function HeroBanner() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative w-full py-32 px-4 overflow-hidden flex flex-col items-center justify-center min-h-[40vh]">
      <div className="text-center max-w-3xl relative z-10 w-full mt-4">
        <p className="text-on-surface-variant font-medium text-lg mb-8 max-w-xl mx-auto opacity-80">
          An interactive ecommerce app in kids category for children, a colorful palette with bright kids.
        </p>

        <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto shadow-ambient-lg rounded-full bg-white flex items-center p-2 transition-transform focus-within:scale-[1.02]">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 w-full bg-transparent text-2xl font-medium text-on-surface px-6 py-4 focus:outline-none border-none ring-0 placeholder:text-on-surface-variant/40"
          />
          <button 
            type="submit"
            className="bg-secondary-fixed-dim hover:bg-secondary transition-colors w-16 h-16 rounded-full flex items-center justify-center shrink-0"
            aria-label="Search"
          >
            <span className="material-symbols-outlined text-3xl text-on-secondary-fixed">search</span>
          </button>
        </form>
      </div>
    </section>
  );
}
