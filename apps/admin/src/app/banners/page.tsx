import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';

export const metadata = { title: 'Banners' };

export default function BannersPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Banners</h1>
        <button className="btn-primary">+ Add Banner</button>
      </div>
      <Table headers={['Title', 'Platform', 'Sort', 'Active', 'Actions']} rows={[]} />
    </AdminLayout>
  );
}
