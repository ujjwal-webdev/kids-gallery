export const metadata = { title: 'My Orders' };

export default function OrdersPage() {
  return (
    <div className="container-page py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
      {/* TODO: List user orders */}
      <p className="text-gray-500">No orders yet.</p>
    </div>
  );
}
