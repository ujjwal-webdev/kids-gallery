import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/lib/services';

interface CategoryGridProps {
  categories: Category[];
}

const categoryColorMap: Record<string, { bg: string, labelBg: string }> = {
  'stationery': { bg: 'bg-[#fff4b0]', labelBg: 'bg-[#fce575]' }, // yellow
  'gift-items-kids': { bg: 'bg-[#ffdad8]', labelBg: 'bg-[#fbaeb3]' }, // pink
  'gift-items-adults': { bg: 'bg-[#f3ede0]', labelBg: 'bg-[#e8dcc4]' }, // neutral
  'party-supplies': { bg: 'bg-[#ffdad8]', labelBg: 'bg-[#fca5ab]' }, // pinkish orange
  'school-essentials': { bg: 'bg-[#ffdf9e]', labelBg: 'bg-[#f2cb7c]' }, // orange
  'art-craft': { bg: 'bg-[#e0d4f5]', labelBg: 'bg-[#cbaef2]' }, // purple
  'occasion-gifts': { bg: 'bg-[#b6e3f4]', labelBg: 'bg-[#89cce8]' }, // sky blue
};

const categoryImageMap: Record<string, string> = {
  'stationery': '/images/categories/stationery.png',
  'gift-items-kids': '/images/categories/gift-items-kids.png',
  'gift-items-adults': '/images/categories/gift-items-adults.png',
  'party-supplies': '/images/categories/party-supplies.png',
  'school-essentials': '/images/categories/school-essentials.png',
  'art-craft': '/images/categories/art-craft.png',
  'occasion-gifts': '/images/categories/occasion-gifts.png',
};

const getCategoryImage = (slug: string) => {
  return categoryImageMap[slug] || '/images/categories/party-supplies.png';
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-8 px-4 max-w-5xl mx-auto mb-16">
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className="text-secondary-fixed-dim text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">-</span>
        <h2 className="text-4xl md:text-5xl font-display text-on-surface">Shop By Category</h2>
        <span className="text-secondary-fixed-dim text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">-</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {categories.map((category) => {
          const colors = categoryColorMap[category.slug] || { bg: 'bg-[#b6e3f4]', labelBg: 'bg-[#9ad3eb]' }; // default green/blue

          return (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className={`group flex flex-col items-center justify-end rounded-[2.5rem] pt-8 px-0 pb-0 overflow-hidden shadow-ambient hover:shadow-ambient-md transition-all hover:-translate-y-2 ${colors.bg}`}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square max-w-[220px] flex-shrink-0 px-4">
                <Image
                  src={getCategoryImage(category.slug)}
                  alt={category.name}
                  fill
                  className="object-contain object-bottom transition-transform duration-300 rounded-[2.5rem]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>

              {/* Label */}
              <div className={`w-[110%] text-center py-5 mt-2 ${colors.labelBg}`}>
                <h3 className="text-white font-display text-2xl md:text-3xl tracking-wide">{category.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
