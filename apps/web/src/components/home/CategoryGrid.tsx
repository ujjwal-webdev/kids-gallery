import Link from 'next/link';

const categories = [
  { name: 'Stationery', slug: 'stationery', emoji: '✏️', color: 'bg-yellow-50 border-yellow-200' },
  { name: 'Kids Gifts', slug: 'gift-items-kids', emoji: '🎁', color: 'bg-pink-50 border-pink-200' },
  { name: 'Adults Gifts', slug: 'gift-items-adults', emoji: '🎀', color: 'bg-purple-50 border-purple-200' },
  { name: 'Party Supplies', slug: 'party-supplies', emoji: '🎉', color: 'bg-orange-50 border-orange-200' },
  { name: 'School Essentials', slug: 'school-essentials', emoji: '🎒', color: 'bg-blue-50 border-blue-200' },
  { name: 'Art & Craft', slug: 'art-craft', emoji: '🖌️', color: 'bg-teal-50 border-teal-200' },
  { name: 'Occasion Gifts', slug: 'occasion-gifts', emoji: '🎊', color: 'bg-green-50 border-green-200' },
];

export function CategoryGrid() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/categories/${cat.slug}`} className={`flex flex-col items-center p-4 rounded-xl border ${cat.color} hover:shadow-sm transition-shadow`}>
            <span className="text-3xl mb-2">{cat.emoji}</span>
            <span className="text-xs font-medium text-center text-gray-700">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
