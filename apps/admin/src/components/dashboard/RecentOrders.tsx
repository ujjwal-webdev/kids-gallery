import { Card } from '@/components/ui/Card';

export function RecentOrders() {
  return (
    <Card>
      <h3 className="font-semibold text-gray-900 mb-4">Recent Orders</h3>
      <p className="text-gray-400 text-sm text-center py-8">No recent orders</p>
    </Card>
  );
}
