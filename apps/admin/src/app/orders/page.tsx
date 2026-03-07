import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';

export const metadata = { title: 'Orders' };

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>
      <Table headers={['Order #', 'Customer', 'Amount', 'Status', 'Payment', 'Date', 'Actions']} rows={[]} />
    </AdminLayout>
  );
}
