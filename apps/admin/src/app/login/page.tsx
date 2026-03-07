export const metadata = { title: 'Admin Login' };

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        {/* TODO: Login form */}
        <p className="text-center text-gray-500 text-sm">Enter your credentials to access the admin panel</p>
      </div>
    </div>
  );
}
