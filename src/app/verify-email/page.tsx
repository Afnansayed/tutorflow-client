'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client'; // wherever you configured Better Auth

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      toast.error('Invalid verification link');
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const { data, error } = await authClient.verifyEmail({
          query: {
            token,
          },
        });

        console.log({ data });

        // toast.success('Email verified successfully!');
        // router.push('/login');
      } catch (err: any) {
        toast.error(err?.message || 'Verification failed');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      {loading ? <p>Verifying email…</p> : <p>Done</p>}
    </div>
  );
}
