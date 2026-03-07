import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Kid's Gallery 🎨</h3>
            <p className="text-sm">Your one-stop shop for stationery, gifts, party supplies, and more!</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories/stationery" className="hover:text-white">Stationery</Link></li>
              <li><Link href="/categories/gift-items-kids" className="hover:text-white">Kids Gifts</Link></li>
              <li><Link href="/categories/party-supplies" className="hover:text-white">Party Supplies</Link></li>
              <li><Link href="/categories/art-craft" className="hover:text-white">Art & Craft</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/auth/login" className="hover:text-white">Login</Link></li>
              <li><Link href="/orders" className="hover:text-white">My Orders</Link></li>
              <li><Link href="/wishlist" className="hover:text-white">Wishlist</Link></li>
              <li><Link href="/profile" className="hover:text-white">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white cursor-pointer">Contact Us</span></li>
              <li><span className="hover:text-white cursor-pointer">Shipping Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Return Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Kid's Gallery. All rights reserved. | Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}
