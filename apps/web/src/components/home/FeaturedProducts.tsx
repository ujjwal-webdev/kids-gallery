import Link from 'next/link';
import { formatPrice } from '@kids-gallery/shared';

// Hardcoded fallback data to match the screenshot exactly if DB is empty
const fallbackProducts = [
  { id: '1', name: 'The Artisan Ark', price: 249.00, badge: "COLLECTOR'S EDITION", desc: "Limited availability", emoji: '🚢', bgColor: 'bg-white' },
  { id: '2', name: 'Modern Stacker', price: 42.00, desc: "Natural Beechwood", emoji: '🥞', bgColor: 'bg-[#eae4de]' },
  { id: '3', name: 'Savanna Puzzle', price: 38.00, desc: "Eco-friendly Inks", emoji: '🦒', bgColor: 'bg-[#7cf3e9]' },
  { id: '4', name: 'Nordic Play Kitchen', price: 315.00, desc: "The ultimate dream kitchen for little chefs. Sustainable pine...", emoji: '🍳', bgColor: 'bg-[#ffcf70]' }
];

export async function FeaturedProducts() {
  let products = fallbackProducts;
  
  // Try fetching, but map to the hardcoded structure if data exists
  try {
    const res = await fetch('http://localhost:4000/api/products/featured', { cache: 'no-store' });
    const data = await res.json();
    if (data.success && data.data.length >= 4) {
      products = data.data.slice(0, 4).map((p: any, i: number) => ({
        id: p.id,
        name: p.name,
        price: p.sellingPrice,
        desc: fallbackProducts[i].desc,
        badge: i === 0 ? "COLLECTOR'S EDITION" : undefined,
        emoji: fallbackProducts[i].emoji,
        bgColor: fallbackProducts[i].bgColor
      }));
    }
  } catch (error) {
    console.error('Failed to fetch featured products', error);
  }

  return (
    <section className="mt-24 mb-24">
      <div className="text-center mb-12">
        <h2 className="text-[2.5rem] font-bold text-[#1a1a1a] tracking-tight">Featured Treasures</h2>
        <p className="text-[#5a5a5a] text-sm mt-3">Hand-picked heirloom quality pieces for your little ones.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        
        {/* Item 1: Tall Left Card */}
        <Link href={`/products/${products[0].id}`} className={`col-span-1 md:row-span-2 rounded-[2rem] p-8 ${products[0].bgColor} flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow`}>
          <div>
            {products[0].badge && (
              <span className="inline-block bg-[#ae2f34] text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full mb-4 uppercase">
                {products[0].badge}
              </span>
            )}
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-1">{products[0].name}</h3>
            <p className="text-[#7a6b5d] text-sm mb-4">{products[0].desc}</p>
            <span className="text-lg font-bold text-[#ae2f34]">{formatPrice(products[0].price)}</span>
          </div>
          <div className="flex-1 min-h-[200px] flex items-center justify-center text-8xl group-hover:scale-105 transition-transform duration-500">
            {products[0].emoji}
          </div>
        </Link>

        {/* Item 2: Top Middle Card */}
        <Link href={`/products/${products[1].id}`} className={`col-span-1 md:row-span-1 rounded-[2rem] p-6 ${products[1].bgColor} flex flex-col justify-between group relative shadow-sm hover:shadow-md transition-shadow`}>
          <div className="w-full flex-1 bg-white/50 rounded-2xl mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-300">
            {products[1].emoji}
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-bold text-[#1a1a1a] text-sm mb-1">{products[1].name}</h3>
              <p className="text-[#7a6b5d] text-xs mb-2">{products[1].desc}</p>
              <span className="font-bold text-[#1a1a1a] text-sm">{formatPrice(products[1].price)}</span>
            </div>
            <button className="w-8 h-8 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              +
            </button>
          </div>
        </Link>

        {/* Item 3: Top Right Card */}
        <Link href={`/products/${products[2].id}`} className={`col-span-1 md:row-span-1 rounded-[2rem] p-6 ${products[2].bgColor} flex flex-col justify-between group relative shadow-sm hover:shadow-md transition-shadow`}>
          <div className="w-full flex-1 bg-white/50 rounded-2xl mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-300">
            {products[2].emoji}
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-bold text-[#1a1a1a] text-sm mb-1">{products[2].name}</h3>
              <p className="text-[#1a1a1a]/60 text-xs mb-2">{products[2].desc}</p>
              <span className="font-bold text-[#1a1a1a] text-sm">{formatPrice(products[2].price)}</span>
            </div>
            <button className="w-8 h-8 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              -
            </button>
          </div>
        </Link>

        {/* Item 4: Bottom Right Wide Card */}
        <Link href={`/products/${products[3].id}`} className={`col-span-1 md:col-span-2 md:row-span-1 rounded-[2rem] p-8 ${products[3].bgColor} flex items-center justify-between group shadow-sm hover:shadow-md transition-shadow overflow-hidden`}>
          <div className="max-w-[200px] z-10">
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{products[3].name}</h3>
            <p className="text-[#7a6b5d] text-xs mb-4 leading-relaxed">{products[3].desc}</p>
            <span className="text-lg font-bold text-[#ae2f34]">{formatPrice(products[3].price)}</span>
          </div>
          <div className="w-48 h-48 bg-[#29564f] rounded-2xl flex items-center justify-center text-7xl shadow-inner group-hover:scale-105 transition-transform duration-500">
            {products[3].emoji}
          </div>
        </Link>

      </div>
    </section>
  );
}
