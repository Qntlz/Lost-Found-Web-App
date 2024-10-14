import { Metadata } from 'next';
import LoginForm from '../ui/login/login-form';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex">
      <div className="flex-1 flex flex-col">
        <LoginForm />
      </div>
    </main>
  );
}
