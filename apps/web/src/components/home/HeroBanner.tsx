import Link from 'next/link';

export function HeroBanner() {
  return (
    <div className="container-page py-6">
      <div className="bg-[#fce6b5] rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center min-h-[500px]">
        
        {/* Decorative Star */}
        <div className="absolute top-12 right-16 opacity-30">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-[#cfa444]">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>

        <div className="flex-1 max-w-xl z-10 relative">
          <h1 className="text-[5rem] font-bold text-[#4a3f35] leading-[1.1] tracking-tight mb-6">
            Curation of <br />
            <span className="text-primary block">Pure</span>
            <span className="text-primary block">Wonder.</span>
          </h1>
          <p className="text-title-md font-medium text-[#7a6b5d] mb-10 max-w-sm leading-relaxed">
            Discover a gallery-grade collection of wooden toys and artisan treasures designed to inspire generations.
          </p>
          <Link href="/products" className="btn-primary py-4 px-10 text-lg shadow-ambient">
            Shop Now
          </Link>
        </div>
        
      </div>
    </div>
  );
}
