'use client';

export function ProductFilters() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          {['Under ₹200', '₹200–₹500', '₹500–₹1000', 'Above ₹1000'].map((range) => (
            <label key={range} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-primary-500" />
              <span>{range}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="popular">Popular</option>
        </select>
      </div>
    </div>
  );
}
