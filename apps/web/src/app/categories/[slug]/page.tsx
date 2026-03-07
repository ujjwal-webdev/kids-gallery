interface Props {
  params: { slug: string };
}

export default function CategoryPage({ params }: Props) {
  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Category: {params.slug}</h1>
      {/* TODO: Category products */}
      <p className="text-gray-500">Loading category products...</p>
    </div>
  );
}
