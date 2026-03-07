import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';

export const metadata = { title: 'Categories' };

export default function CategoriesPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <button className="btn-primary">+ Add Category</button>
      </div>
      <Table headers={['Name', 'Slug', 'Parent', 'Products', 'Status', 'Actions']} rows={[]} />
    </AdminLayout>
  );
}
