'use client';

import { useState } from 'react';
import { Product } from '@/lib/services';
import { useCartStore } from '@/store/cartStore';

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.sellingPrice),
      mrp: Number(product.mrp),
      image: product.images?.[0]?.url,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const inStock = product.stock > 0;

  return (
    <div className="space-y-6">
      {/* Quantity selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Qty</span>
        <div className="flex items-center gap-0 bg-surface-container-high rounded-full border border-outline-variant/20 overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="w-12 h-12 flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors disabled:opacity-30"
            aria-label="Decrease quantity"
          >
            <span className="material-symbols-outlined text-[20px]">remove</span>
          </button>
          <span className="w-12 text-center font-bold text-lg text-on-surface select-none">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
            disabled={quantity >= (product.stock || 10)}
            className="w-12 h-12 flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors disabled:opacity-30"
            aria-label="Increase quantity"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`flex-1 py-4 md:py-5 rounded-full text-lg md:text-xl font-black shadow-[0px_16px_32px_rgba(174,47,52,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 ${
            added
              ? 'bg-green-500 text-white shadow-[0px_16px_32px_rgba(34,197,94,0.3)]'
              : 'bg-gradient-to-r from-primary to-on-primary-container text-white'
          }`}
        >
          {added ? (
            <>
              Added to Cart!
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </>
          ) : !inStock ? (
            'Out of Stock'
          ) : (
            <>
              Add to Cart
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            </>
          )}
        </button>
        <button className="w-full sm:w-16 h-[60px] sm:h-auto rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container transition-colors group border border-outline-variant/20 shadow-sm">
          <span className="material-symbols-outlined text-on-surface group-hover:text-primary transition-colors text-[24px]">favorite</span>
        </button>
      </div>
    </div>
  );
}
