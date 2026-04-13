import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { getProducts } from '@/lib/services';
import Link from 'next/link';

export const metadata = { title: 'Toys | Kid\'s Gallery' };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const categorySlug = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const search = typeof resolvedParams.search === 'string' ? resolvedParams.search : undefined;
  const products = await getProducts(categorySlug, search);

  return (
    <main className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 md:pt-12 pb-24">
      {/* Discovery Zone Header */}
      <section className="relative mb-12">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-secondary-fixed-dim text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>{search ? 'search' : 'star'}</span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface tracking-tight">
            {search ? `Results for "${search}"` : 'Fun Toys'}
          </h1>
        </div>
        <p className="text-on-surface-variant mt-4 text-lg md:text-xl max-w-2xl font-medium">
          {search
            ? `Found ${products.length} product${products.length !== 1 ? 's' : ''} matching your search.`
            : 'Curated playtime essentials that spark imagination and bring endless joy to your little ones.'}
        </p>
        {search && (
          <Link
            href="/products"
            className="inline-flex items-center gap-1 mt-4 text-primary font-bold hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
            Clear search
          </Link>
        )}
        
        {/* Floating Decorative Element */}
        {!search && (
          <div className="absolute -top-10 right-10 md:right-20 opacity-10 select-none pointer-events-none hidden sm:block">
            <span className="material-symbols-outlined text-[8rem] md:text-[12rem]">toys</span>
          </div>
        )}
      </section>

      {/* Filter / Sorting Bar */}
      <ProductFilters totalProducts={products.length} />

      {/* Product Grid */}
      <ProductGrid products={products} />

      {/* Promotion Section - hide when searching */}
      {!search && (
        <section className="mt-24 rounded-xl overflow-hidden bg-tertiary-container/30 relative flex flex-col md:flex-row items-center border border-outline-variant/10">
          <div className="flex-1 p-10 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-tertiary">
              <span className="material-symbols-outlined">palette</span>
              <span className="font-bold uppercase tracking-widest text-sm">Upcoming Event</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-on-tertiary-container mb-6 leading-tight">Join our Art Workshop!</h2>
            <p className="text-lg md:text-xl text-on-tertiary-container/80 mb-10 max-w-lg font-medium">
              Spark creativity with our weekly hands-on art sessions. Materials provided, just bring your imagination!
            </p>
            <button className="bg-tertiary text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-tertiary/20">
              Learn More
            </button>
          </div>
          <div className="flex-1 relative w-full h-[300px] md:h-auto self-stretch md:min-h-[400px]">
            <div className="w-full h-full bg-tertiary flex items-center justify-center opacity-80">
              <span className="text-9xl drop-shadow-md">🎨</span>
            </div>
            {/* Playful overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-surface to-transparent md:from-tertiary-container/30"></div>
          </div>
          
          {/* Floating Dots Texture */}
          <div className="absolute bottom-10 left-10 opacity-20 pointer-events-none hidden md:block">
            <div className="grid grid-cols-4 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-tertiary"></div>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
