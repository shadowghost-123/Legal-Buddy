'use client';

import { AuthForm } from '@/components/legalease/auth-form';
import { useUser } from '@/firebase/auth/use-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthenticationPage() {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/home');
        }
    }, [user, loading, router]);

    if (loading || user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-md p-8">
        <AuthForm />
      </div>
    </div>
  );
}
