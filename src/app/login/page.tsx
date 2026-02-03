'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, GraduationCap, ArrowRight } from 'lucide-react';
import { userLogin } from '@/components/Authentication/userLogin';
import { toast } from 'sonner';
import { setToken, setUserInfo } from '@/components/Redux/Slice/authSlice';
import { useAppDispatch } from '@/components/Redux/hooks';
import { useRouter } from 'next/navigation';

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

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    const toastId = toast.loading('Logging in...');

    try {
      const res = await userLogin(data);
      if (res?.data?.token) {
        const { user, token } = res?.data;
        dispatch(setToken({ accessToken: token }));
        dispatch(
          setUserInfo({
            email: user.email,
            name: user.name,
            category: user.category,
            email_verified: user.email_verified,
          })
        );
        reset();
        toast.success('Login Successful', { id: toastId, duration: 2000 });

        const redirectRoute = sessionStorage.getItem('redirect_to');
        router.push(redirectRoute ? JSON.parse(redirectRoute) : '/dashboard');
      } else {
        toast.error(res?.data?.message || 'Invalid credentials', {
          id: toastId,
        });
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-secondary/50">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      {/* Left side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[1000px] grid md:grid-cols-2 rounded-[1.5rem] overflow-hidden bg-white shadow-2xl shadow-primary/10 border border-primary/5"
      >
        <div className="hidden md:flex bg-primary p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

          <Link href="/" className="flex items-center gap-2 relative z-10">
            <div className="bg-white p-2 rounded-xl text-primary">
              <GraduationCap size={28} />
            </div>
            <span className="text-2xl font-black tracking-tighter">
              TutorFlow
            </span>
          </Link>

          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6 leading-tight tracking-tighter">
              Welcome Back to <br /> Your Learning Hub.
            </h2>
            <p className="text-white/80 font-medium text-lg mb-8">
              Log in to continue your journey with the world's best mentors.
            </p>
          </div>

          <div className="relative z-10">
            <p className="mb-4 text-sm font-bold opacity-70 italic">
              New here?
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary rounded-xl font-black hover:bg-secondary transition-all shadow-lg"
            >
              Create Account <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Right Side*/}
        <div className="p-8 md:p-16 bg-white">
          <div className="w-full max-w-sm mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">
                Sign In
              </h1>
              <p className="text-slate-500 font-bold text-sm">
                Enter your details to access your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Email Address
                </label>
                <input
                  {...register('email', { required: 'Email is required' })}
                  className="w-full px-5 py-4 bg-secondary/50 border border-primary/10 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all font-semibold"
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-black text-primary hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Min 8 characters required',
                      },
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-5 py-4 bg-secondary/50 border border-primary/10 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all font-semibold"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-primary"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-black transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? 'Authenticating...' : 'Sign In to Account'}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
