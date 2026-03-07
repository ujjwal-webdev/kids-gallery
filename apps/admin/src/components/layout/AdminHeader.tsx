export function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div></div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Admin User</span>
        <button className="text-sm text-red-600 hover:text-red-700">Logout</button>
      </div>
    </header>
  );
}
