import Link from 'next/link';

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    ageRange: string;
    price: string;
    emoji: string;
    isNew: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-surface-container-lowest rounded-xl p-4 transition-all duration-300 hover:shadow-[0_32px_64px_rgba(29,28,19,0.06)] flex flex-col border border-outline-variant/10">
      <div className="relative aspect-square rounded-lg bg-surface-container overflow-hidden mb-6 flex items-center justify-center">
        
        {/* Placeholder Emoji instead of img src */}
        <div className="w-full h-full flex items-center justify-center bg-surface-container-high text-9xl group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
          {product.emoji}
        </div>
        
        <button className="absolute top-4 right-4 h-10 w-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all z-10" aria-label="Favorite">
          <span className="material-symbols-outlined text-[20px]">favorite</span>
        </button>
        
        {product.isNew && (
          <div className="absolute bottom-4 left-4 bg-tertiary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase z-10 shadow-sm">
            New
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow">
        <span className="text-secondary text-xs font-bold uppercase tracking-wider mb-1">{product.ageRange}</span>
        <h3 className="text-xl font-bold text-on-surface mb-2">{product.name}</h3>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="text-2xl font-black text-on-surface">{product.price}</span>
          <button 
            className="bg-secondary-container text-on-secondary-container h-12 w-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95 shadow-sm"
            aria-label={`Add ${product.name} to cart`}
            onClick={(e) => {
              e.preventDefault();
              console.log('Added to cart:', product.name);
            }}
          >
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
