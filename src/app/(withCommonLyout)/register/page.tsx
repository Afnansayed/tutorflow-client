'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  Eye,
  EyeOff,
  GraduationCap,
  User,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { userRegister } from '@/components/Authentication/userRegister';
import { authClient } from '@/lib/auth-client';

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'TUTOR';
}

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      role: 'STUDENT',
    },
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    const toastId = toast.loading('Creating account...');

    // payload for registration
    const registerData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    // console.log({ registerData });

    try {
      const { data, error } = await authClient.signUp.email(registerData);
      if (error) {
        toast.error((error as any).message || 'Invalid credential', {
          id: toastId,
          duration: 2000,
        });
      }

      if (data) {
        toast.success(
          'verification email send . please check your inbox and verify the email',
          {
            id: toastId,
            duration: 2000,
          }
        );
      }
    } catch (err) {
      console.error('Registration Error:', err);
      toast.error('Something went wrong. Please check your connection.', {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4 py-16 bg-[#f8fafc]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1050px] grid md:grid-cols-2 rounded-[2rem] overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-100"
      >
        {/* Left Side: Soft Brand Section */}
        <div className="hidden md:flex bg-[#2596be] p-12 flex-col justify-between text-white relative">
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />

          <Link
            href="/"
            className="flex items-center gap-2 relative z-10 opacity-90 hover:opacity-100 transition-opacity"
          >
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30">
              <GraduationCap size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">TutorFlow</span>
          </Link>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-5 tracking-tight leading-[1.2]">
              Start your journey <br /> with expert mentors.
            </h2>
            <div className="space-y-4">
              {['Personalized Learning', 'Expert Tutors', 'Live Sessions'].map(
                (item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-white/80 text-sm font-medium"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-white/50" />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/10">
            <p className="text-xs font-medium text-white/60 mb-4 uppercase tracking-widest">
              Already a member?
            </p>
            <Link
              href="/login"
              className="text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Login to Account <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right Side: Soft Form Section */}
        <div className="p-8 md:p-14 bg-white">
          <div className="w-full max-w-sm mx-auto">
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">
                Create Account
              </h1>
              <p className="text-slate-400 font-medium text-sm italic">
                Join our community today
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
                    placeholder="Enter your name"
                  />
                  <User
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    {...register('email', { required: 'Email is required' })}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
                    placeholder="mail@example.com"
                  />
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                  />
                </div>
              </div>
              {/* Role Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                  I want to join as a
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      {...register('role')}
                      value="STUDENT"
                      className="peer sr-only"
                    />
                    <div className="p-3 text-center bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 peer-checked:bg-[#2596be]/10 peer-checked:border-[#2596be] peer-checked:text-[#2596be] transition-all">
                      Student
                    </div>
                  </label>

                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      {...register('role')}
                      value="TUTOR"
                      className="peer sr-only"
                    />
                    <div className="p-3 text-center bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 peer-checked:bg-[#2596be]/10 peer-checked:border-[#2596be] peer-checked:text-[#2596be] transition-all">
                      Tutor
                    </div>
                  </label>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <input
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
                    placeholder="••••••••"
                  />
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full py-4 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-primary/10 active:scale-[0.99] disabled:opacity-50 mt-2"
              >
                {loading ? 'Creating Account...' : 'Create Free Account'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-[11px] font-medium text-slate-400">
                By clicking, you agree to our{' '}
                <span className="underline cursor-pointer">
                  Terms of Service
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
