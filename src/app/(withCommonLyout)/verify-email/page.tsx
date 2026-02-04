'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, MailCheck, ArrowRight } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [countdown, setCountdown] = useState(5);

  const handleVerify = async () => {
    if (!token) {
      toast.error('Invalid link');
      return;
    }
    setStatus('loading');
    try {
      const { data, error } = await authClient.verifyEmail({
        query: { token },
      });
      if (error) {
        setStatus('error');
        toast.error(error.message);
      } else {
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'success' && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0) {
      router.push('/login');
    }
    return () => clearInterval(timer);
  }, [status, countdown, router]);

  return (
    <div className=" w-full flex items-center justify-center px-4 py-16 bg-[#F5F7F9]">
      {' '}
      {/* Muted background */}
      {/* Background Decor - Extremely subtle */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#2596be0a,transparent_50%)]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] bg-white/80 backdrop-blur-sm rounded-[2rem] p-10 border border-slate-200 shadow-sm text-center"
      >
        <AnimatePresence mode="wait">
          {status !== 'success' ? (
            <motion.div
              key="verify-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-8 text-slate-400">
                <MailCheck size={32} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl font-bold text-slate-700 mb-3 tracking-tight">
                Email Confirmation
              </h1>
              <p className="text-slate-500 font-medium text-sm mb-10 leading-relaxed px-4">
                Verify your email to get full access to your TutorFlow account.
              </p>

              <button
                onClick={handleVerify}
                disabled={status === 'loading' || !token}
                className="w-full py-3.5 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-xl font-semibold text-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <Loader2 size={18} className="animate-spin opacity-80" />
                ) : (
                  'Confirm Email'
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={36} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl font-bold text-slate-700 mb-2">
                Success!
              </h1>
              <p className="text-slate-500 text-sm font-medium mb-8">
                Redirecting you in{' '}
                <span className="text-slate-800 font-bold">{countdown}s</span>
              </p>

              {/* Minimalist Progress Loader */}
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-8">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="h-full bg-emerald-400"
                />
              </div>

              <button
                onClick={() => router.push('/login')}
                className="text-slate-400 hover:text-primary text-xs font-bold flex items-center gap-1.5 mx-auto transition-colors"
              >
                Click here if not redirected <ArrowRight size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!token && status === 'idle' && (
          <div className="mt-6 p-3 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-amber-700 text-[11px] font-bold">
              Invalid or expired token.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
