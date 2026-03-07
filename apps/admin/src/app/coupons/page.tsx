import { AdminLayout } from '@/components/layout/AdminLayout';
import { Table } from '@/components/ui/Table';

export const metadata = { title: 'Coupons' };

export default function CouponsPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
        <button className="btn-primary">+ Add Coupon</button>
      </div>
      <Table headers={['Code', 'Type', 'Value', 'Usage', 'Valid Until', 'Status', 'Actions']} rows={[]} />
    </AdminLayout>
  );
}
