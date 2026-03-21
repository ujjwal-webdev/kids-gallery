'use client';

import { ProductCard } from './ProductCard';

const MOCK_TOYS = [
  {
    id: '1',
    name: 'Building Blocks Set',
    slug: 'building-blocks-set',
    ageRange: 'Ages 3-6',
    price: '$34.99',
    emoji: '🧱',
    isNew: false,
  },
  {
    id: '2',
    name: 'Cuddly Plush Bear',
    slug: 'cuddly-plush-bear',
    ageRange: 'Ages 0+',
    price: '$22.00',
    emoji: '🧸',
    isNew: false,
  },
  {
    id: '3',
    name: 'Turbo Racer RC Car',
    slug: 'turbo-racer-rc',
    ageRange: 'Ages 8+',
    price: '$45.50',
    emoji: '🏎️',
    isNew: true,
  },
  {
    id: '4',
    name: 'Little Artist Kit',
    slug: 'little-artist-kit',
    ageRange: 'Ages 5+',
    price: '$29.99',
    emoji: '🎨',
    isNew: false,
  }
];

export function ProductGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {MOCK_TOYS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
