import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';

export const metadata = { title: 'Products' };

export default function ProductsPage() {
  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Products</h1>
      <div className="flex gap-8">
        <aside className="w-64 shrink-0">
          <ProductFilters />
        </aside>
        <div className="flex-1">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}
