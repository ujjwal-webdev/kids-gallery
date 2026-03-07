import Link from 'next/link';

const navItems = [
  { label: 'Dashboard', href: '/', icon: '📊' },
  { label: 'Products', href: '/products', icon: '📦' },
  { label: 'Orders', href: '/orders', icon: '🛒' },
  { label: 'Categories', href: '/categories', icon: '🗂️' },
  { label: 'Customers', href: '/customers', icon: '👥' },
  { label: 'Coupons', href: '/coupons', icon: '🎫' },
  { label: 'Banners', href: '/banners', icon: '🖼️' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-900 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-white font-bold text-lg">Kid's Gallery</h1>
        <p className="text-gray-400 text-xs mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white text-sm transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
