import { AdminLayout } from '@/components/layout/AdminLayout';

export const metadata = { title: 'Settings' };

export default function SettingsPage() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      {/* TODO: Settings form */}
      <p className="text-gray-500">Settings coming soon.</p>
    </AdminLayout>
  );
}
