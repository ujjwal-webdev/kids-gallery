import { notFound } from 'next/navigation';

export const metadata = { title: 'Colorful Wooden Building Blocks | Kid\'s Gallery' };

interface Props {
  params: { slug: string };
}

export default function ProductDetailPage({ params }: Props) {
  // In the future, fetch actual product data based on params.slug
  const isMock = true; // Use the mock layout

  return (
    <main className="pt-12 md:pt-24 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto space-y-24">
      {/* Product Main Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Gallery */}
        <div className="space-y-6">
          <div className="aspect-square bg-surface-container-low rounded-2xl overflow-hidden shadow-sm relative group flex items-center justify-center">
            {/* Visual placeholder instead of image */}
            <div className="w-full h-full bg-surface-container-high flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
              <span className="text-[15rem] drop-shadow-xl">🧱</span>
            </div>
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full p-2 cursor-pointer hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>favorite</span>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            <div className="w-24 h-24 flex-shrink-0 bg-surface-container-highest rounded-xl border-4 border-primary overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-sm flex items-center justify-center text-4xl">
              🧱
            </div>
            <div className="w-24 h-24 flex-shrink-0 bg-surface-container-highest rounded-xl border-2 border-transparent overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-sm flex items-center justify-center text-4xl">
              🟥
            </div>
            <div className="w-24 h-24 flex-shrink-0 bg-surface-container-highest rounded-xl border-2 border-transparent overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-sm flex items-center justify-center text-4xl">
              🟦
            </div>
            <div className="w-24 h-24 flex-shrink-0 bg-surface-container-highest rounded-xl border-2 border-transparent overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-sm flex items-center justify-center text-4xl">
              🟨
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col h-full justify-center space-y-8">
          <div>
            <span className="inline-block px-4 py-1.5 bg-tertiary-container text-on-tertiary-container text-xs font-bold uppercase tracking-widest rounded-full mb-4 shadow-sm">
              Best Seller
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter leading-tight mb-4">
              Colorful Wooden Building Blocks
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-secondary">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
              </div>
              <span className="text-secondary font-semibold text-sm">(128 reviews)</span>
            </div>
            <p className="text-4xl font-black text-primary">$45.00</p>
          </div>

          {/* Set Size Options */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/20">
            <p className="font-bold text-on-surface uppercase tracking-widest text-xs">Choose Set Size</p>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 rounded-full border-2 border-primary bg-primary-container text-on-primary-container font-bold shadow-sm transition-all">24 Pieces</button>
              <button className="px-6 py-3 rounded-full border-2 border-outline-variant/30 bg-surface-container-highest text-on-surface hover:border-outline-variant font-bold transition-all">48 Pieces</button>
              <button className="px-6 py-3 rounded-full border-2 border-outline-variant/30 bg-surface-container-highest text-on-surface hover:border-outline-variant font-bold transition-all">100 Pieces</button>
            </div>
          </div>

          {/* Color Theme Selector */}
          <div className="space-y-4 pt-4 border-t border-outline-variant/20">
            <p className="font-bold text-on-surface uppercase tracking-widest text-xs">Color Theme</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary border-4 border-surface shadow-md cursor-pointer ring-2 ring-primary"></div>
              <div className="w-10 h-10 rounded-full bg-secondary border-4 border-surface shadow-md cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-10 h-10 rounded-full bg-tertiary border-4 border-surface shadow-md cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-10 h-10 rounded-full bg-blue-500 border-4 border-surface shadow-md cursor-pointer hover:scale-110 transition-transform"></div>
            </div>
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm font-medium text-secondary pt-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600 text-[20px]">local_shipping</span>
              Free Shipping
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600 text-[20px]">verified</span>
              Eco-Friendly Wood
            </div>
          </div>
        </div>
      </section>

      {/* Satisfaction Metrics */}
      <section className="bg-surface-container-lowest border border-outline-variant/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto space-y-10 md:space-y-12 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-on-surface">Customer Satisfaction</h2>
            <p className="text-secondary font-medium">Real scores from 1,200+ playtime sessions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="font-bold text-lg text-on-surface">Durability</span>
                <span className="text-primary font-black text-2xl">98%</span>
              </div>
              <div className="h-4 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '98%' }}></div>
              </div>
              <p className="text-xs text-secondary font-medium">Tested against toughest toddler drops</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="font-bold text-lg text-on-surface">Educational</span>
                <span className="text-tertiary font-black text-2xl">92%</span>
              </div>
              <div className="h-4 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-tertiary rounded-full" style={{ width: '92%' }}></div>
              </div>
              <p className="text-xs text-secondary font-medium">STEM approved for spatial learning</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="font-bold text-lg text-on-surface">Fun Factor</span>
                <span className="text-secondary font-black text-2xl">100%</span>
              </div>
              <div className="h-4 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs text-secondary font-medium">Hours of endless creative play</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Treasures Section */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-on-surface">Related Treasures</h2>
            <p className="text-secondary font-medium text-lg">Hand-picked additions to your playroom gallery</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-1 group">
            Explore all toys
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Related Item 1 */}
          <div className="group cursor-pointer bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-all">
            <div className="aspect-square bg-surface-container-high rounded-lg flex items-center justify-center text-7xl mb-4 group-hover:scale-[1.02] transition-transform duration-300">
              <span className="group-hover:scale-110 transition-transform drop-shadow-md">⭕</span>
            </div>
            <h3 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors tracking-tight">Stacking Rings</h3>
            <p className="text-secondary font-semibold text-lg">$24.00</p>
          </div>
          
          {/* Related Item 2 */}
          <div className="group cursor-pointer bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-all">
            <div className="aspect-square bg-surface-container-high rounded-lg flex items-center justify-center text-7xl mb-4 group-hover:scale-[1.02] transition-transform duration-300">
              <span className="group-hover:scale-110 transition-transform drop-shadow-md">🧩</span>
            </div>
            <h3 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors tracking-tight">ABC Cubes</h3>
            <p className="text-secondary font-semibold text-lg">$32.00</p>
          </div>
          
          {/* Related Item 3 */}
          <div className="group cursor-pointer bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-all">
            <div className="aspect-square bg-surface-container-high rounded-lg flex items-center justify-center text-7xl mb-4 group-hover:scale-[1.02] transition-transform duration-300">
              <span className="group-hover:scale-110 transition-transform drop-shadow-md">🗺️</span>
            </div>
            <h3 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors tracking-tight">Geo Puzzle</h3>
            <p className="text-secondary font-semibold text-lg">$18.00</p>
          </div>
          
          {/* Related Item 4 */}
          <div className="group cursor-pointer bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-all">
            <div className="aspect-square bg-surface-container-high rounded-lg flex items-center justify-center text-7xl mb-4 group-hover:scale-[1.02] transition-transform duration-300">
              <span className="group-hover:scale-110 transition-transform drop-shadow-md">🚂</span>
            </div>
            <h3 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors tracking-tight">Wooden Train</h3>
            <p className="text-secondary font-semibold text-lg">$38.00</p>
          </div>
        </div>
      </section>
    </main>
  );
}
