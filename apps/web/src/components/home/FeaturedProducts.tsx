import { ProductGrid } from '@/components/products/ProductGrid';

export function FeaturedProducts() {
  // TODO: Fetch featured products from API
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
        <a href="/products" className="text-sm text-primary-600 hover:underline font-medium">View All →</a>
      </div>
      <ProductGrid products={[]} />
    </section>
  );
}
