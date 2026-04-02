'use client';

import { CartItemLocal, useCartStore } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemLocal;
}

const EMOJI_MAP: Record<string, string> = {};
const FALLBACK_EMOJIS = ['🧱', '🧸', '🏎️', '🎨', '🧩', '🚂', '🥁', '🎁'];

function getEmoji(productId: string) {
  if (EMOJI_MAP[productId]) return EMOJI_MAP[productId];
  const code = productId.charCodeAt(productId.length - 1) || 0;
  return FALLBACK_EMOJIS[code % FALLBACK_EMOJIS.length];
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const lineTotal = item.price * item.quantity;
  const hasMrpDiscount = item.mrp > item.price;

  return (
    <div className="flex gap-4 sm:gap-6 p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      {/* Product visual */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-surface-container-high rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
        ) : (
          <span className="text-5xl sm:text-6xl">{getEmoji(item.productId)}</span>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-bold text-on-surface text-base sm:text-lg leading-tight line-clamp-2">{item.name}</h3>
            {item.variantName && (
              <p className="text-xs text-secondary mt-0.5">{item.variantName}</p>
            )}
          </div>
          <button
            onClick={() => removeItem(item.productId, item.variantId)}
            className="text-gray-300 hover:text-red-500 transition-colors shrink-0 p-1"
            aria-label={`Remove ${item.name} from cart`}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-on-surface text-base">₹{item.price}</span>
          {hasMrpDiscount && (
            <>
              <span className="text-gray-400 line-through text-sm">₹{item.mrp}</span>
              <span className="text-green-600 text-xs font-semibold">
                {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% off
              </span>
            </>
          )}
        </div>

        {/* Quantity stepper + line total */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-0 bg-surface-container rounded-full overflow-hidden border border-outline-variant/20">
            <button
              onClick={() => {
                if (item.quantity <= 1) {
                  removeItem(item.productId, item.variantId);
                } else {
                  updateQuantity(item.productId, item.quantity - 1, item.variantId);
                }
              }}
              className="w-9 h-9 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
              aria-label="Decrease quantity"
            >
              <span className="material-symbols-outlined text-[18px]">
                {item.quantity <= 1 ? 'delete' : 'remove'}
              </span>
            </button>
            <span className="w-10 text-center font-bold text-sm tabular-nums">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
              className="w-9 h-9 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
              aria-label="Increase quantity"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>
          <span className="font-black text-lg text-on-surface">₹{lineTotal}</span>
        </div>
      </div>
    </div>
  );
}
