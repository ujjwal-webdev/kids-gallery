'use client';

interface CartItemProps {
  item?: {
    id: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  };
}

export function CartItem({ item }: CartItemProps) {
  if (!item) return null;
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-100">
      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">🎁</div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{item.productName}</p>
        <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
        <p className="font-semibold text-gray-900 mt-1">₹{item.unitPrice}</p>
      </div>
      <button className="text-gray-400 hover:text-red-500">✕</button>
    </div>
  );
}
