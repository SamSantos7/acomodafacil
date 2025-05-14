import { LoginForm } from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}