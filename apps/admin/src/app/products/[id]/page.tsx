import { AdminLayout } from '@/components/layout/AdminLayout';

interface Props { params: { id: string }; }

export default function EditProductPage({ params }: Props) {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product #{params.id}</h1>
      {/* TODO: Edit product form */}
      <p className="text-gray-500">Product edit form coming soon.</p>
    </AdminLayout>
  );
}
