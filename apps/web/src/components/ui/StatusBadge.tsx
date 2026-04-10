'use client';

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; icon: string }> = {
  PENDING:          { label: 'Pending',          bg: 'bg-amber-100',   text: 'text-amber-700',  icon: 'schedule' },
  CONFIRMED:        { label: 'Confirmed',        bg: 'bg-blue-100',    text: 'text-blue-700',   icon: 'check_circle' },
  PROCESSING:       { label: 'Processing',       bg: 'bg-indigo-100',  text: 'text-indigo-700', icon: 'settings' },
  PACKED:           { label: 'Packed',            bg: 'bg-purple-100',  text: 'text-purple-700', icon: 'inventory_2' },
  SHIPPED:          { label: 'Shipped',           bg: 'bg-cyan-100',    text: 'text-cyan-700',   icon: 'local_shipping' },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery',  bg: 'bg-teal-100',    text: 'text-teal-700',   icon: 'two_wheeler' },
  DELIVERED:        { label: 'Delivered',          bg: 'bg-green-100',   text: 'text-green-700',  icon: 'check_circle' },
  CANCELLED:        { label: 'Cancelled',          bg: 'bg-red-100',     text: 'text-red-700',    icon: 'cancel' },
  RETURN_REQUESTED: { label: 'Return Requested',   bg: 'bg-orange-100',  text: 'text-orange-700', icon: 'undo' },
  RETURNED:         { label: 'Returned',            bg: 'bg-gray-100',    text: 'text-gray-700',   icon: 'assignment_return' },
  REFUNDED:         { label: 'Refunded',            bg: 'bg-gray-100',    text: 'text-gray-600',   icon: 'currency_rupee' },
};

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || { label: status, bg: 'bg-gray-100', text: 'text-gray-600', icon: 'info' };

  const sizeClass = size === 'md'
    ? 'px-3 py-1.5 text-sm gap-1.5'
    : 'px-2 py-0.5 text-xs gap-1';

  const iconSize = size === 'md' ? 'text-[16px]' : 'text-[14px]';

  return (
    <span className={`inline-flex items-center ${sizeClass} rounded-full font-semibold ${config.bg} ${config.text}`}>
      <span className={`material-symbols-outlined ${iconSize}`} style={{ fontVariationSettings: "'FILL' 1" }}>
        {config.icon}
      </span>
      {config.label}
    </span>
  );
}
