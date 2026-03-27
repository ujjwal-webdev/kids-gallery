'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function HeroBanner() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
      {/* Rounded hero card with illustration as background */}
      <div className="relative w-full max-w-[1400px] aspect-[16/9] md:aspect-[2/1] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex items-center justify-center">
        {/* Illustration background */}
        <Image
          src="/images/hero-banner-v2.png"
          alt="Happy children with toys, gifts, and school supplies"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
          className="object-cover select-none"
          priority
        />

        {/* Content overlay */}
        <div className="relative z-10 text-center max-w-2xl w-full px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-on-surface leading-tight mb-4">
            Curation of{' '}
            <span className="text-primary">Pure Wonder.</span>
          </h1>
          <p className="text-on-surface-variant font-medium text-sm md:text-base lg:text-lg mb-8 max-w-md mx-auto opacity-80">
            Discover curated toys, gifts & school essentials that spark joy and imagination in every child.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-on-primary font-bold text-lg px-8 py-4 rounded-full shadow-ambient-md hover:shadow-ambient-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Shop Now
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
