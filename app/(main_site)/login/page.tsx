import { Metadata } from 'next';
import LoginForm from '@/app/ui/login/login-form'

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <div className="md:flex-col md:flex-grow">
        <LoginForm />
      </div>
    </main>
  );
}
