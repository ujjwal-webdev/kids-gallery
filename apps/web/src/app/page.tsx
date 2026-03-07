import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <div className="container-page py-10 space-y-12">
        <CategoryGrid />
        <FeaturedProducts />
      </div>
    </div>
  );
}
