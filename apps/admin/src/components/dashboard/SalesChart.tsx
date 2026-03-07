'use client';

import { Card } from '@/components/ui/Card';

export function SalesChart() {
  return (
    <Card>
      <h3 className="font-semibold text-gray-900 mb-4">Sales Overview</h3>
      <div className="h-48 flex items-center justify-center text-gray-400">
        {/* TODO: Add Recharts sales chart */}
        <p>Sales chart coming soon</p>
      </div>
    </Card>
  );
}
