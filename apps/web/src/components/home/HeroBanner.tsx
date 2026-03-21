import Link from 'next/link';

export function HeroBanner() {
  return (
    <section className="relative px-6 md:px-12 pt-8 pb-16 max-w-[1440px] mx-auto overflow-hidden">
      <div className="bg-secondary-container rounded-xl md:rounded-xl overflow-hidden flex flex-col items-center justify-center text-center relative min-h-[500px] p-12 md:p-20">
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 opacity-20 pointer-events-none">
          <span className="material-symbols-outlined text-9xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        </div>
        <div className="absolute bottom-10 left-10 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-8xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
        </div>
        <div className="absolute top-1/2 left-20 transform -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
          <span className="material-symbols-outlined text-8xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>toys</span>
        </div>
        
        <div className="z-10 max-w-3xl flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-on-secondary-container leading-[1.1] tracking-tight mb-6">
            Curation of <br/><span className="text-primary">Pure Wonder.</span>
          </h1>
          <p className="text-xl text-on-secondary-container opacity-80 mb-10 max-w-xl font-medium">
            Discover a gallery-grade collection of wooden toys and artisan treasures designed to inspire generations.
          </p>
          <Link href="/products" className="inline-block bg-primary text-on-primary px-10 py-5 rounded-full text-lg font-bold shadow-[0_12px_24px_rgba(174,47,52,0.2)] hover:shadow-[0_16px_32px_rgba(174,47,52,0.3)] transition-all transform hover:-translate-y-1">
            Shop Now
          </Link>
        </div>
        
      </div>
    </section>
  );
}
