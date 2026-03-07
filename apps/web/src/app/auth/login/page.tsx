export const metadata = { title: 'Login' };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login to Kid's Gallery</h1>
        {/* TODO: OTP login form */}
        <p className="text-center text-gray-500">Enter your phone number to receive an OTP</p>
      </div>
    </div>
  );
}
