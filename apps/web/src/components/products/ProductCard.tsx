'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/services';
import { useCartStore } from '@/store/cartStore';
import { WishlistButton } from '@/components/wishlist/WishlistButton';

export interface ProductCardProps {
  product: Product;
}

const VISUAL_FALLBACKS = ['🧱', '🧸', '🏎️', '🎨', '🧩', '🚂', '🥁'];

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartItems = useCartStore((s) => s.items);
  const cartItem = cartItems.find((i) => i.productId === product.id);
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
  };

  return (
    <div className="group bg-surface-container-lowest rounded-xl p-4 transition-all duration-300 hover:shadow-[0_32px_64px_rgba(29,28,19,0.06)] flex flex-col border border-outline-variant/10 relative">
      <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0" aria-label={`View ${product.name}`} />
      
      <div className="relative aspect-square rounded-lg bg-surface-container overflow-hidden mb-6 flex items-center justify-center pointer-events-none">
        {product.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.images[0].altText || product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 pointer-events-auto"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-container-high text-9xl group-hover:scale-110 transition-transform duration-300 drop-shadow-md pointer-events-auto">
            {emoji}
          </div>
        )}
        
        <div className="absolute top-4 right-4 z-20 pointer-events-auto">
          <WishlistButton productId={product.id} size="sm" />
        </div>
        
        {product.isFeatured && (
          <div className="absolute bottom-4 left-4 bg-tertiary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase z-10 shadow-sm pointer-events-auto">
            Top Choice
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow relative z-10 pointer-events-none">
        <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-1 line-clamp-1">{product.category?.name || 'Toys'}</span>
        <h3 className="text-xl font-bold text-on-surface mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="mt-auto flex justify-between items-center pointer-events-auto">
          <span className="text-2xl font-black text-on-surface">₹{product.sellingPrice}</span>
          
          {cartItem ? (
            <div className="flex items-center gap-1 bg-surface-container-high rounded-full border border-outline-variant/30 h-10 px-1 shadow-sm">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (cartItem.quantity <= 1) removeItem(product.id);
                  else updateQuantity(product.id, cartItem.quantity - 1);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors active:scale-95"
                aria-label="Decrease quantity"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              
              <span className="w-6 text-center font-bold text-sm text-on-surface">{cartItem.quantity}</span>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  updateQuantity(product.id, Math.min(product.stock || 10, cartItem.quantity + 1));
                }}
                disabled={cartItem.quantity >= (product.stock || 10)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors active:scale-95 disabled:opacity-30"
                aria-label="Increase quantity"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          ) : (
            <button 
              className="h-12 w-12 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-sm bg-secondary-container text-on-secondary-container hover:scale-110"
              aria-label={`Add ${product.name} to cart`}
              onClick={handleAddToCart}
            >
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                add
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
