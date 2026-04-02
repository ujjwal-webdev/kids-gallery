'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/services';
import { useCartStore } from '@/store/cartStore';

export interface ProductCardProps {
  product: Product;
}

const VISUAL_FALLBACKS = ['🧱', '🧸', '🏎️', '🎨', '🧩', '🚂', '🥁'];

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const charCode = product.id.charCodeAt(product.id.length - 1) || 0;
  const emoji = VISUAL_FALLBACKS[charCode % VISUAL_FALLBACKS.length];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.sellingPrice),
      mrp: Number(product.mrp),
      image: product.images?.[0]?.url,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Link href={`/products/${product.slug}`} className="group bg-surface-container-lowest rounded-xl p-4 transition-all duration-300 hover:shadow-[0_32px_64px_rgba(29,28,19,0.06)] flex flex-col border border-outline-variant/10 cursor-pointer">
      <div className="relative aspect-square rounded-lg bg-surface-container overflow-hidden mb-6 flex items-center justify-center">
        {product.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.images[0].altText || product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-container-high text-9xl group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
            {emoji}
          </div>
        )}
        
        <button 
          className="absolute top-4 right-4 h-10 w-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all z-10" 
          aria-label="Favorite"
          onClick={(e) => { e.preventDefault(); }}
        >
          <span className="material-symbols-outlined text-[20px]">favorite</span>
        </button>
        
        {product.isFeatured && (
          <div className="absolute bottom-4 left-4 bg-tertiary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase z-10 shadow-sm">
            Top Choice
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow">
        <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-1 line-clamp-1">{product.category?.name || 'Toys'}</span>
        <h3 className="text-xl font-bold text-on-surface mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="text-2xl font-black text-on-surface">₹{product.sellingPrice}</span>
          <button 
            className={`h-12 w-12 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-sm ${
              added
                ? 'bg-green-500 text-white scale-110'
                : 'bg-secondary-container text-on-secondary-container hover:scale-110'
            }`}
            aria-label={`Add ${product.name} to cart`}
            onClick={handleAddToCart}
          >
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {added ? 'check' : 'add'}
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
}
