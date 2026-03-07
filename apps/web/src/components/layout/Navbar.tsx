'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary-50 border-b border-primary-100">
      <div className="container-page">
        <div className="flex items-center gap-6 py-2 text-sm overflow-x-auto whitespace-nowrap">
          <Link href="/categories/stationery" className="text-gray-700 hover:text-primary-600 font-medium">Stationery</Link>
          <Link href="/categories/gift-items-kids" className="text-gray-700 hover:text-primary-600 font-medium">Kids Gifts</Link>
          <Link href="/categories/gift-items-adults" className="text-gray-700 hover:text-primary-600 font-medium">Adults Gifts</Link>
          <Link href="/categories/party-supplies" className="text-gray-700 hover:text-primary-600 font-medium">Party Supplies</Link>
          <Link href="/categories/school-essentials" className="text-gray-700 hover:text-primary-600 font-medium">School</Link>
          <Link href="/categories/art-craft" className="text-gray-700 hover:text-primary-600 font-medium">Art & Craft</Link>
          <Link href="/categories/occasion-gifts" className="text-gray-700 hover:text-primary-600 font-medium">Occasion Gifts</Link>
        </div>
      </div>
    </nav>
  );
}
