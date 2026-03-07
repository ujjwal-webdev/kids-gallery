interface StatsCardProps { title: string; value: string; trend?: string; icon?: string; }

export function StatsCard({ title, value, trend, icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">{title}</p>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {trend && <p className="text-xs text-green-600 mt-1">{trend} from last month</p>}
    </div>
  );
}
