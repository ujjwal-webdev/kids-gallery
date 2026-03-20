import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <div className="container-page py-10 space-y-16">
        <CategoryGrid />
        <FeaturedProducts />
        
        {/* Newsletter Section from new Desktop Design */}
        <section className="bg-[#ffd9dc] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden mb-24" style={{ backgroundImage: 'radial-gradient(#f4babb 2px, transparent 2px)', backgroundSize: '32px 32px' }}>
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            
            <div className="text-[#ae2f34] mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            
            <h2 className="text-[2.5rem] font-bold text-[#ae2f34] mb-4 tracking-tight">Join the Playgroup</h2>
            <p className="text-[#ae2f34] text-sm mb-10 leading-relaxed max-w-md mx-auto">
              Sign up to receive early access to new collection drops, gallery events, and stories from our workshop.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-xl mx-auto mb-6">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-white text-[#1a1a1a] rounded-full px-8 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#ae2f34]/30 shadow-sm"
                required
              />
              <button type="submit" className="bg-[#ae2f34] text-white font-bold rounded-full py-4 px-10 text-sm hover:bg-[#8e2429] transition-colors shadow-md">
                Subscribe
              </button>
            </form>
            
            <p className="text-[10px] text-[#ae2f34]/60">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
