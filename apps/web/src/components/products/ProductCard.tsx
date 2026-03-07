import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, calculateDiscountPercent } from '@kids-gallery/shared';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    mrp: number;
    sellingPrice: number;
    images: { url: string; altText?: string }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = calculateDiscountPercent(product.mrp, product.sellingPrice);
  const image = product.images[0];

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-square bg-gray-50">
          {image ? (
            <Image src={image.url} alt={image.altText || product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl">🎁</div>
          )}
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">{discount}% OFF</span>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-bold text-gray-900">{formatPrice(product.sellingPrice)}</span>
            {discount > 0 && <span className="text-xs text-gray-400 line-through">{formatPrice(product.mrp)}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
