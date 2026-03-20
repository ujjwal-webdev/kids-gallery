import Link from 'next/link';

const categories = [
  { name: 'Building Sets', slug: 'building-sets', emoji: '🧱', color: 'bg-[#f29b28]', innerColor: 'bg-white/20' },
  { name: 'Art Supplies', slug: 'art-supplies', emoji: '🎨', color: 'bg-[#78efe6]', innerColor: 'bg-[#ffebd6]' },
  { name: 'Bookshelf', slug: 'bookshelf', emoji: '📚', color: 'bg-[#ecc96b]', innerColor: 'bg-[#29564f]' },
  { name: 'Gallery Decor', slug: 'decor', emoji: '🖼️', color: 'bg-[#e3d8cf]', innerColor: 'bg-[#fff5ee]' },
  { name: 'Gift Sets', slug: 'gift-sets', emoji: '🎁', color: 'bg-[#fdccce]', innerColor: 'bg-white/50' },
];

export function CategoryGrid() {
  return (
    <section className="mt-20 mb-20">
      <div className="mb-8">
        <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">The Essentials</span>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="text-[2.5rem] font-bold text-[#1a1a1a] leading-tight">Browse by Category</h2>
          <Link href="/categories" className="text-sm font-semibold text-[#5a5a5a] hover:text-primary transition-colors flex items-center gap-1 pb-1">
            View All Categories <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-between gap-6">
        {categories.map((cat) => (
          <Link 
            key={cat.slug} 
            href={`/categories/${cat.slug}`} 
            className="flex flex-col items-center group w-32 md:w-40"
          >
            <div className={`w-full aspect-square rounded-full ${cat.color} p-3 mb-6 relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2`}>
              <div className={`w-full h-full rounded-full ${cat.innerColor} flex items-center justify-center text-4xl shadow-inner`}>
                <span className="group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
              </div>
            </div>
            <span className="text-sm font-bold text-center text-[#1a1a1a]">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
