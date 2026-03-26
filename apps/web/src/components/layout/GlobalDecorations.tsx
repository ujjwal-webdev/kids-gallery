'use client';

import React, { useState, useEffect } from 'react';

const ICONS = ['star', 'circle', 'favorite', 'toys', 'umbrella', 'rocket_launch', 'extension', 'cake'];
const COLORS = ['text-primary', 'text-secondary', 'text-tertiary-fixed', 'text-primary-fixed-dim', 'text-secondary-fixed-dim', 'text-yellow-400', 'text-purple-400'];

export function GlobalDecorations() {
  const [mounted, setMounted] = useState(false);
  const [decorations, setDecorations] = useState<any[]>([]);

  useEffect(() => {
    // Generate random positions after mount to completely avoid Next.js hydration mismatches
    const generated = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 40 + 25, // Increased size: 25px to 65px
      left: Math.random() * 95 + 2.5, // Spread across viewport bounds
      top: Math.random() * 95 + 2.5,
      animDuration: Math.random() * 15 + 10, // 10s to 25s movement loop (slower, more ambient)
      animDelay: Math.random() * -30, // Negative start so they are already spread out immediately
      rotate: Math.random() * 360,
    }));
    setDecorations(generated);
    setMounted(true); // Now we can safely render on client
  }, []);

  if (!mounted) return null; // Server paints nothing, client hydrates, then paints randomly

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {decorations.map((dec) => (
        <div
          key={dec.id}
          // To change the opacity of the icons, change "opacity-10" below to opacity-5, opacity-20, etc!
          className={`absolute ${dec.color} opacity-40 animate-float-around`}
          style={{
            left: `${dec.left}%`,
            top: `${dec.top}%`,
            fontSize: `${dec.size}px`,
            animationDuration: `${dec.animDuration}s`,
            animationDelay: `${dec.animDelay}s`,
            transform: `rotate(${dec.rotate}deg)`,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: 'inherit' }}>
            {dec.icon}
          </span>
        </div>
      ))}
    </div>
  );
}
