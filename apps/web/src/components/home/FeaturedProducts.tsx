'use client';

import Link from 'next/link';
import { Product } from '@/lib/services';

interface FeaturedProductsProps {
  products: Product[];
}

const VISUAL_FALLBACKS = ['🚢', '🧱', '🦒', '🍳', '🎨', '🧸', '🏎️'];

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  // If no products available, don't break the layout
  if (!products || products.length === 0) return null;

  // Map the first 4 featured products to the 4 distinct layout slots
  const p1 = products[0];
  const p2 = products[1] || products[0];
  const p3 = products[2] || products[0];
  const p4 = products[3] || products[0];

  return (
    <section className="py-16 bg-surface-container-low">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black tracking-tighter mb-4 text-on-surface">Featured Treasures</h2>
          <p className="text-secondary font-medium text-lg">Hand-picked heirloom quality pieces for your little ones.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[800px]">
          
          {/* Large Feature Card (Slot 1) */}
          <Link href={`/products/${p1.slug}`} className="block md:col-span-2 md:row-span-2 bg-surface-container-lowest rounded-lg p-8 flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-xl transition-all relative overflow-hidden min-h-[400px] border border-outline-variant/30 hover:border-primary/30">
            <div className="z-10 bg-white/50 backdrop-blur-sm p-4 rounded-xl inline-block max-w-sm">
              <span className="bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Special Drop</span>
              <h3 className="text-4xl font-extrabold mt-6 mb-2 tracking-tight line-clamp-2">{p1.name}</h3>
              <p className="text-secondary font-medium text-lg line-clamp-2">{p1.shortDesc || 'Premium curated collection'}</p>
              <p className="text-primary font-bold text-3xl mt-6">₹{p1.sellingPrice}</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-primary-container rounded-full mix-blend-multiply opacity-50 transition-transform group-hover:scale-110 blur-3xl text-center flex items-center justify-center pointer-events-none"></div>
             <div className="absolute bottom-10 right-10 text-[12rem] drop-shadow-2xl transition-transform group-hover:scale-110 group-hover:-rotate-3 pointer-events-none">
              {VISUAL_FALLBACKS[0]}
            </div>
          </Link>

          {/* Small Card 1 (Slot 2) */}
          <Link href={`/products/${p2.slug}`} className="block bg-surface-container-highest rounded-lg p-6 flex flex-col group cursor-pointer shadow-sm hover:shadow-xl transition-all overflow-hidden min-h-[350px] border border-outline-variant/10 hover:border-primary/20">
            <h3 className="font-bold text-2xl mb-1 text-on-surface line-clamp-2">{p2.name}</h3>
            <p className="text-secondary text-sm mb-4">{p2.brand || 'Featured Brand'}</p>
            <div className="flex-grow flex items-center justify-center">
               <div className="text-7xl drop-shadow-md group-hover:scale-110 transition-transform my-4">{VISUAL_FALLBACKS[1]}</div>
            </div>
            <div className="mt-auto flex justify-between items-center">
              <span className="font-bold text-2xl text-primary">₹{p2.sellingPrice}</span>
              <button 
                className="bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform"
                onClick={(e) => { e.preventDefault(); console.log('Added to cart:', p2.name); }}
              >
                <span className="material-symbols-outlined text-sm font-bold">add</span>
              </button>
            </div>
          </Link>

          {/* Small Card 2 (Slot 3) */}
          <Link href={`/products/${p3.slug}`} className="block bg-tertiary-container rounded-lg p-6 flex flex-col group cursor-pointer shadow-sm hover:shadow-xl transition-all overflow-hidden min-h-[350px] border border-outline-variant/10 hover:border-primary/20">
            <h3 className="font-bold text-2xl mb-1 text-on-tertiary-container line-clamp-2">{p3.name}</h3>
            <p className="text-tertiary text-sm mb-4">{p3.brand || 'Eco-friendly'}</p>
            <div className="flex-grow flex items-center justify-center">
               <div className="text-7xl drop-shadow-md group-hover:scale-110 transition-transform my-4">{VISUAL_FALLBACKS[2]}</div>
            </div>
            <div className="mt-auto flex justify-between items-center">
              <span className="font-bold text-2xl text-tertiary">₹{p3.sellingPrice}</span>
              <button 
                className="bg-tertiary text-on-tertiary w-10 h-10 rounded-full flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform"
                onClick={(e) => { e.preventDefault(); console.log('Added to cart:', p3.name); }}
              >
                <span className="material-symbols-outlined text-sm font-bold">add</span>
              </button>
            </div>
          </Link>

          {/* Wide Card (Slot 4) */}
          <Link href={`/products/${p4.slug}`} className="block md:col-span-2 bg-secondary-container rounded-lg p-8 flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-xl transition-all overflow-hidden min-h-[350px] border border-outline-variant/10 hover:border-secondary/30 relative">
            <div className="z-10 max-w-[50%] bg-white/40 backdrop-blur-md p-4 rounded-xl">
              <h3 className="text-3xl font-extrabold mb-2 text-on-secondary-container line-clamp-2">{p4.name}</h3>
              <p className="text-on-secondary-container opacity-80 mb-6 font-medium line-clamp-2">{p4.shortDesc || 'Perfect addition to any playroom.'}</p>
              <span className="font-bold text-3xl text-primary">₹{p4.sellingPrice}</span>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0 bg-secondary rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="text-[10rem] drop-shadow-xl transform group-hover:scale-105 transition-transform z-10">{VISUAL_FALLBACKS[3]}</div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
