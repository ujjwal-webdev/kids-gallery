import Image from 'next/image';
import Link from 'next/link';

export function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-r from-primary-500 to-accent-teal overflow-hidden">
      <div className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Kid's Gallery 🎨
          </h1>
          <p className="text-primary-100 text-lg mb-8">
            Discover stationery, gifts, party supplies, and much more. Making every moment special!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-primary-50 transition-colors">
              Shop Now
            </Link>
            <Link href="/categories/occasion-gifts" className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors">
              Explore Gifts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
