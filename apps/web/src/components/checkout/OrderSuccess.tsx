'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface OrderSuccessProps {
  orderId: string;
}

const CONFETTI_EMOJIS = ['🎉', '🎊', '✨', '🥳', '🎈', '⭐', '🌟', '💫'];

export function OrderSuccess({ orderId }: OrderSuccessProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; emoji: string; left: number; delay: number }>>([]);

  useEffect(() => {
    const pieces = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
      left: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setConfetti(pieces);

    // Auto-clear confetti after animation
    const timer = setTimeout(() => setConfetti([]), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((piece) => (
        <span
          key={piece.id}
          className="absolute text-2xl pointer-events-none animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            top: '-10%',
            animationDelay: `${piece.delay}s`,
          }}
        >
          {piece.emoji}
        </span>
      ))}

      {/* Success icon */}
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-scale-in">
        <span className="material-symbols-outlined text-green-600 text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          check_circle
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-on-surface mb-3">Order Placed! 🎉</h1>
      <p className="text-secondary text-lg mb-2 max-w-md">
        Thank you for shopping with Kid's Gallery. Your little one is going to love it!
      </p>

      {/* Order ID */}
      <div className="bg-surface-container rounded-xl px-6 py-3 mb-8 inline-block">
        <p className="text-xs text-secondary uppercase tracking-wider mb-0.5">Order ID</p>
        <p className="font-mono font-bold text-on-surface text-lg">{orderId}</p>
      </div>

      {/* Info cards */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-lg w-full">
        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 text-left">
          <span className="material-symbols-outlined text-primary text-[24px] mb-2 block">local_shipping</span>
          <p className="font-bold text-sm text-on-surface">Delivery</p>
          <p className="text-xs text-secondary">Estimated in 3-5 business days</p>
        </div>
        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 text-left">
          <span className="material-symbols-outlined text-primary text-[24px] mb-2 block">account_balance_wallet</span>
          <p className="font-bold text-sm text-on-surface">Payment</p>
          <p className="text-xs text-secondary">Cash on Delivery</p>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/products"
        className="bg-primary text-on-primary font-bold px-8 py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-md text-base"
      >
        Continue Shopping →
      </Link>
    </div>
  );
}
