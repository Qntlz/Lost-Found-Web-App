import { Metadata } from 'next';
import SignUpForm from '@/app/ui/signup/signup-form';

export const metadata: Metadata = {
  title: 'SignUp',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex">
      <div className="flex-1 flex flex-col">
        <SignUpForm />
      </div>
    </main>
  );
}
