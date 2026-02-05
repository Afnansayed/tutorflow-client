'use client';

import { useAppSelector } from '@/components/Redux/hooks';
import { useGetMyProfileQuery } from '@/components/Redux/RTK/tutorApi';
import { useCurrentUserInfo } from '@/components/Redux/Slice/authSlice';
import { TutorProfile } from '@/type';
import { motion } from 'framer-motion';
import {
  User as UserIcon,
  Mail,
  Star,
  Clock,
  BookOpen,
  Edit3,
  PlusCircle,
  Globe,
  Award,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const TutorAccountPage = () => {
  const { data, isLoading } = useGetMyProfileQuery(undefined);
  const userInfo = useAppSelector(useCurrentUserInfo);
  const profileData: TutorProfile = data?.data;

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {profileData ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4 space-y-6"
            >
              <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/60 text-center relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="w-32 h-32 mx-auto rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={
                        profileData.profile_picture ||
                        'https://ui-avatars.com/api/?name=' +
                          profileData.user.name
                      }
                      className="w-full h-full object-cover"
                      alt="Profile"
                    />
                  </div>
                  <h2 className="mt-6 text-xl font-black text-slate-800 tracking-tight">
                    {profileData.user.name}
                  </h2>
                  <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mt-1 italic">
                    Certified Tutor
                  </p>

                  <div className="mt-6 flex items-center justify-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={
                          i < Math.floor(profileData.average_rating)
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    ))}
                    <span className="text-slate-400 text-xs font-bold ml-1">
                      ({profileData.total_reviews})
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-white/60 space-y-4">
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Hourly Rate
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      ${profileData.hourly_rate}/hr
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Email Address
                    </p>
                    <p className="text-sm font-bold text-slate-700 truncate max-w-[150px]">
                      {profileData.user.email}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-8 space-y-6"
            >
              <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-10 shadow-sm border border-white relative overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Award size={24} />
                  </div>
                  <Link href="/dashboard/tutor/edit-profile">
                    <button className="flex items-center gap-2 px-5 py-2.5 hover:bg-slate-900 text-white rounded-xl text-xs font-bold bg-primary transition-all shadow-lg shadow-slate-200">
                      <Edit3 size={14} /> Edit Profile
                    </button>
                  </Link>
                </div>

                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
                  About Me
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {profileData.bio}
                </p>

                <div className="mt-12">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
                    Subject Expertise
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {profileData.categories.map((cat, idx) => (
                      <motion.div
                        whileHover={{ y: -5 }}
                        key={idx}
                        className="px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-3 group"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                        <span className="text-sm font-bold text-slate-700">
                          {cat.name}
                        </span>
                        <span className="text-[9px] font-black text-primary/40 bg-primary/5 px-2 py-0.5 rounded-md uppercase">
                          {cat.sub_code}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          // if user has no profile
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mt-10"
          >
            <div className="bg-white rounded-[3rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />

              <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                <UserIcon size={40} className="text-slate-300" />
              </div>

              <h2 className="text-3xl font-black text-slate-800 mb-4">
                Ready to start teaching?
              </h2>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed px-10">
                Welcome,{' '}
                <span className="text-primary font-bold">{userInfo?.name}</span>
                ! Your profile is currently empty. Build your professional tutor
                brand in minutes.
              </p>

              <Link href="/tutor-dashboard/account/new">
                <button className="group relative px-10 py-5 bg-primary text-white rounded-[2rem] font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:pr-14 active:scale-95 shadow-xl shadow-primary/20">
                  <span className="relative z-10 flex items-center gap-2">
                    Create Profile{' '}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TutorAccountPage;
