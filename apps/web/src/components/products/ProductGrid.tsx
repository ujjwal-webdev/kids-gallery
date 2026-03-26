import { ProductCard } from './ProductCard';
import { Product } from '@/lib/services';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="py-24 text-center">
        <span className="material-symbols-outlined text-6xl text-secondary mb-4 opacity-50">inventory_2</span>
        <h3 className="text-2xl font-bold text-on-surface mb-2">No products found</h3>
        <p className="text-on-surface-variant font-medium">Try removing some filters or checking back later!</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
