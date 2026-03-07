import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';

export const metadata = { title: 'Products' };

export default function AdminProductsPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <a href="/products/new" className="btn-primary">+ Add Product</a>
      </div>
      <Table headers={['Name', 'Category', 'Price', 'Stock', 'Status', 'Actions']} rows={[]} />
    </AdminLayout>
  );
}
