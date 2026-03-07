import { notFound } from 'next/navigation';

export const metadata = { title: 'Product Detail' };

interface Props {
  params: { slug: string };
}

export default function ProductDetailPage({ params }: Props) {
  // TODO: Fetch product by slug
  return (
    <div className="container-page py-8">
      <p className="text-gray-500">Loading product: {params.slug}</p>
    </div>
  );
}
