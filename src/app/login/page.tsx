'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  Eye,
  EyeOff,
  GraduationCap,
  ArrowRight,
  Mail,
  Lock,
} from 'lucide-react';
import { userLogin } from '@/components/Authentication/userLogin';
import { toast } from 'sonner';
import { setToken, setUserInfo } from '@/components/Redux/Slice/authSlice';
import { useAppDispatch } from '@/components/Redux/hooks';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();

  const onSubmit = async (value: LoginFormInputs) => {
    setLoading(true);
    const toastId = toast.loading('Logging in...');
    try {
      const { data, error } = await authClient.signIn.email(value);
      console.log({ data });
      console.log({ error });

      if (data) {
        if (data?.token) {
          const { user, token } = data;
          dispatch(setToken({ accessToken: token }));
          dispatch(
            setUserInfo({
              email: user.email,
              name: user.name,
              email_verified: user.emailVerified,
            })
          );
          reset();
          toast.success('Login Successful', { id: toastId, duration: 2000 });
          const redirectRoute = sessionStorage.getItem('redirect_to');
          router.push(redirectRoute ? JSON.parse(redirectRoute) : '/dashboard');
        }
      }

      if (error) {
        toast.error((error as any).message || 'Invalid credential', {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#F9FBFC]">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[950px] grid md:grid-cols-2 rounded-[2rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100"
      >
        {/* Left Side: Muted Primary Section */}
        <div className="hidden md:flex bg-[#2596be] p-12 flex-col justify-between text-white/90 relative">
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

          <Link
            href="/"
            className="flex items-center gap-2 relative z-10 opacity-80 hover:opacity-100 transition-all"
          >
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">TutorFlow</span>
          </Link>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 leading-snug tracking-tight">
              Master new skills <br /> with every session.
            </h2>
            <p className="text-white/70 font-medium text-base">
              Join thousands of students learning from world-class experts.
            </p>
          </div>

          <div className="relative z-10 border-t border-white/10 pt-8">
            <p className="mb-3 text-xs font-semibold text-white/50 uppercase tracking-widest">
              Need an account?
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all"
            >
              Get Started for Free <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right Side: Low-Contrast Form */}
        <div className="p-10 md:p-14 bg-white">
          <div className="w-full max-w-sm mx-auto">
            <div className="mb-10">
              <h1 className="text-2xl font-bold text-slate-700 tracking-tight mb-2">
                Sign In
              </h1>
              <p className="text-slate-400 font-medium text-sm">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    {...register('email', { required: 'Email is required' })}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-primary/40 focus:bg-white transition-all text-sm font-medium"
                    placeholder="name@example.com"
                  />
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-[10px] font-medium mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Password
                  </label>
                  <Link
                    href="/forgot"
                    className="text-[11px] font-bold text-primary/70 hover:text-primary"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: 8,
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-primary/40 focus:bg-white transition-all text-sm font-medium"
                    placeholder="••••••••"
                  />
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full py-3.5 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-primary/10 active:scale-[0.99] disabled:opacity-60 mt-2"
              >
                {loading ? 'Connecting...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-8 text-center text-xs font-medium text-slate-400 md:hidden">
              New here?{' '}
              <Link href="/register" className="text-primary font-bold">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
