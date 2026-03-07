import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container-page">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary-600">
            Kid's Gallery 🎨
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-gray-600 hover:text-primary-600 text-sm font-medium">
              Products
            </Link>
            <Link href="/categories/stationery" className="text-gray-600 hover:text-primary-600 text-sm font-medium">
              Stationery
            </Link>
            <Link href="/categories/gift-items-kids" className="text-gray-600 hover:text-primary-600 text-sm font-medium">
              Gifts
            </Link>
            <Link href="/categories/party-supplies" className="text-gray-600 hover:text-primary-600 text-sm font-medium">
              Party
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="text-gray-600 hover:text-primary-600" aria-label="Cart">
              🛒
            </Link>
            <Link href="/wishlist" className="text-gray-600 hover:text-primary-600" aria-label="Wishlist">
              ❤️
            </Link>
            <Link href="/auth/login" className="btn-primary text-sm">
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
