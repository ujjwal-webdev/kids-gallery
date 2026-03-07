import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';

export const metadata = { title: 'Customers' };

export default function CustomersPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Customers</h1>
      <Table headers={['Name', 'Phone', 'Email', 'Orders', 'Joined', 'Status', 'Actions']} rows={[]} />
    </AdminLayout>
  );
}
