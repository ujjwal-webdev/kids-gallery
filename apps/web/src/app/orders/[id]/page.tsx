interface Props {
  params: { id: string };
}

export default function OrderDetailPage({ params }: Props) {
  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Order #{params.id}</h1>
      {/* TODO: Order detail */}
    </div>
  );
}
