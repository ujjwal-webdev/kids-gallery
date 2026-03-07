import { AdminLayout } from '@/components/layout/AdminLayout';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { TopProducts } from '@/components/dashboard/TopProducts';
import { StatsCard } from '@/components/ui/StatsCard';

export const metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Orders" value="0" trend="+0%" />
          <StatsCard title="Revenue" value="₹0" trend="+0%" />
          <StatsCard title="Products" value="0" trend="+0%" />
          <StatsCard title="Customers" value="0" trend="+0%" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><SalesChart /></div>
          <div><RecentOrders /></div>
        </div>
        <TopProducts />
      </div>
    </AdminLayout>
  );
}
