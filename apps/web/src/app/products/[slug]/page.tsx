import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/services';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  return { title: product ? `${product.name} | Kid's Gallery` : 'Product Not Found' };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Consistent visual fallbacks based on ID string characters
  const charCode = product.id.charCodeAt(product.id.length - 1) || 0;
  const VISUAL_FALLBACKS = ['🧱', '🧸', '🏎️', '🎨', '🧩', '🚂', '🥁'];
  const mainEmoji = VISUAL_FALLBACKS[charCode % VISUAL_FALLBACKS.length];
  const sideEmojis = [VISUAL_FALLBACKS[(charCode+1)%7], VISUAL_FALLBACKS[(charCode+2)%7], VISUAL_FALLBACKS[(charCode+3)%7]];

  return (
    <main className="pt-12 md:pt-24 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto space-y-24">
      {/* Product Main Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Gallery */}
        <div className="space-y-6">
          <div className="aspect-square bg-surface-container-low rounded-2xl overflow-hidden shadow-sm relative group flex items-center justify-center border border-outline-variant/10">
            {/* Visual placeholder instead of image */}
            <div className="w-full h-full bg-surface-container-high flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
              <span className="text-[15rem] drop-shadow-xl">{mainEmoji}</span>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            <div className="w-24 h-24 flex-shrink-0 bg-surface-container-highest rounded-xl border-4 border-primary overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-sm flex items-center justify-center text-4xl">
              {mainEmoji}
            </div>
            {sideEmojis.map((emoji, i) => (
              <div key={i} className="w-24 h-24 flex-shrink-0 bg-surface-container-highest rounded-xl border-2 border-transparent overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-sm flex items-center justify-center text-4xl">
                {emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col h-full justify-center space-y-8">
          <div>
            {product.isFeatured && (
              <span className="inline-block px-4 py-1.5 bg-tertiary-container text-on-tertiary-container text-xs font-bold uppercase tracking-widest rounded-full mb-4 shadow-sm">
                Top Choice
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter leading-tight mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-secondary">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <span className="text-secondary font-semibold text-sm">(12 reviews)</span>
            </div>
            <div className="flex items-end gap-4">
              <p className="text-4xl font-black text-primary">₹{product.sellingPrice}</p>
              {product.mrp && product.mrp !== product.sellingPrice && (
                <p className="text-xl font-bold text-on-surface-variant line-through mb-1">₹{product.mrp}</p>
              )}
            </div>
            {product.shortDesc && (
              <p className="text-lg text-on-surface-variant mt-4 font-medium">{product.shortDesc}</p>
            )}
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-gradient-to-r from-primary to-on-primary-container text-white py-4 md:py-5 rounded-full text-lg md:text-xl font-black shadow-[0px_16px_32px_rgba(174,47,52,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
              Add to Cart
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            </button>
            <button className="w-full sm:w-16 h-[60px] sm:h-auto rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container transition-colors group border border-outline-variant/20 shadow-sm">
              <span className="material-symbols-outlined text-on-surface group-hover:text-primary transition-colors text-[24px]">favorite</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm font-medium text-secondary pt-6 border-t border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600 text-[20px]">local_shipping</span>
              Free Shipping over ₹500
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600 text-[20px]">verified</span>
              Premium Quality
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600 text-[20px]">inventory_2</span>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>
          </div>
        </div>
      </section>

      {/* Product Description */}
      {product.description && (
        <section className="bg-surface-container-lowest border border-outline-variant/10 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-extrabold tracking-tight mb-6 text-on-surface">Product Overview</h2>
          <div className="prose prose-lg text-on-surface-variant font-medium">
            {product.description}
          </div>
        </section>
      )}

      {/* Related Treasures Section - Quick Mock */}
      <section className="space-y-10 border-t border-outline-variant/20 pt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-on-surface">Related Treasures</h2>
            <p className="text-secondary font-medium text-lg">More from {product.category?.name || 'this category'}</p>
          </div>
          <Link href={`/products?category=${product.category?.slug}`} className="text-primary font-bold flex items-center gap-1 group">
            Explore {product.category?.name}
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
