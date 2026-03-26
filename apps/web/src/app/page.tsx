import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { getCategories, getFeaturedProducts } from '@/lib/services';

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
  ]);

  return (
    <main>
      <HeroBanner />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      
      {/* Newsletter Section */}
      <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="bg-primary-container rounded-xl md:rounded-xl p-12 md:p-24 text-center relative overflow-hidden">
          
          {/* Background Decoration */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(#ae2f34 2px, transparent 2px)', backgroundSize: '24px 24px' }}>
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="material-symbols-outlined text-6xl text-primary mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-primary-container mb-6 tracking-tight">
              Join the Playgroup
            </h2>
            <p className="text-lg text-on-primary-container opacity-80 mb-10">
              Sign up to receive early access to new collection drops, gallery events, and stories from our workshop.
            </p>
            
            <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input 
                className="flex-grow px-8 py-5 rounded-full border-none focus:ring-4 focus:ring-primary/20 text-lg font-medium shadow-inner outline-none text-[#1d1c13]" 
                placeholder="Your email address" 
                type="email"
                required
              />
              <button 
                className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-on-primary-fixed-variant transition-colors shadow-lg" 
                type="submit"
              >
                Subscribe
              </button>
            </form>
            
            <p className="mt-6 text-xs text-on-primary-container opacity-50 font-medium">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
