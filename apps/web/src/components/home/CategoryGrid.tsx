import Link from 'next/link';

export function CategoryGrid() {
  const categories = [
    {
      title: 'Building Sets',
      emoji: '🧱',
      bg: 'bg-surface-container-high'
    },
    {
      title: 'Art Supplies',
      emoji: '🎨',
      bg: 'bg-tertiary-container'
    },
    {
      title: 'Bookshelf',
      emoji: '📚',
      bg: 'bg-secondary-container'
    },
    {
      title: 'Gallery Decor',
      emoji: '🖼️',
      bg: 'bg-surface-container-highest'
    },
    {
      title: 'Gift Sets',
      emoji: '🎁',
      bg: 'bg-primary-container'
    }
  ];

  return (
    <section className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">The Essentials</span>
          <h2 className="text-4xl font-extrabold tracking-tight">Browse by Category</h2>
        </div>
        <Link href="/products" className="text-secondary font-bold flex items-center gap-2 hover:gap-3 transition-all">
          View All Categories <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((category) => (
          <Link href="/products" key={category.title} className="group cursor-pointer text-center block">
            <div className={`aspect-square ${category.bg} rounded-full flex items-center justify-center text-6xl mb-4 p-6 transition-transform group-hover:scale-105 border-4 border-transparent group-hover:border-primary-container shadow-sm hover:shadow-md`}>
              <span className="group-hover:scale-110 transition-transform">{category.emoji}</span>
            </div>
            <h3 className="font-bold text-lg">{category.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
