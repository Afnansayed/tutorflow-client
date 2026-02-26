'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Globe,
  Zap,
  ShieldCheck,
  Banknote,
  Sparkles,
  PlayCircle,
  Rocket,
  Layout,
  Star,
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Active Tutors', value: '2,000+' },
  { label: 'Total Students', value: '50,000+' },
  { label: 'Avg. Earnings', value: '$1,500/mo' },
];

const BecomeATutor = () => {
  return (
    <div className="bg-white text-slate-900 overflow-hidden ">
      {/* --- HERO SECTION --- */}
      <section className="relative h-auto flex items-center py-12 bg-secondary">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_rgba(37,150,190,0.08),transparent_50%)]" />

        <div className="container-max relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-[#2596be] text-xs font-bold tracking-widest uppercase mb-6 border border-slate-200">
                <Sparkles size={14} /> Elevate Your Teaching Career
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
                Your Expertise is <br />
                <span className="text-[#2596be] relative">
                  Worth Sharing.
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 358 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 9C118.957 4.47226 237.913 2.91054 355 4"
                      stroke="#2596be"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
                TutorFlow provides the technology and students; you provide the
                inspiration. Join a global network of elite educators.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5">
                <Link
                  href="/register?role=TUTOR"
                  className="group px-6 sm:px-8 py-3 bg-[#2596be] hover:bg-slate-900 text-white rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-2xl shadow-[#2596be]/30 flex items-center justify-center gap-3"
                >
                  Become a Tutor{' '}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-6 sm:px-8 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full font-bold text-base sm:text-lg transition-all flex justify-center items-center gap-2">
                  <PlayCircle size={20} className="text-[#2596be]" /> Watch
                  Story
                </button>
              </div>

              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <p className="text-xl sm:text-2xl font-black text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-[10px] sm:text-sm text-slate-400 font-bold uppercase tracking-tighter">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image / Card Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[1.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]">
                <img
                  src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop"
                  alt="Tutor"
                  className="w-full h-[400px] md:h-[600px] object-cover"
                />
                {/* Floating Glass Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-white/70 backdrop-blur-xl p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/50 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#2596be] flex items-center justify-center text-white font-bold">
                      SJ
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Sarah Jenkins
                      </h4>
                      <p className="text-sm text-slate-600 font-medium italic">
                        "TutorFlow doubled my income in 3 months!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative Blur Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 blur-[80px] rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/20 blur-[80px] rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="space-y-12 py-12 bg-white">
        {/* --- FEATURES SECTION (Modern Bento Style) --- */}
        <section className="container-max px-4">
          <div className="bg-[#f0f9ff] rounded-[1.5rem] p-6 md:p-12 relative overflow-hidden border border-blue-50/50">

            <div className="absolute -top-24 -right-24 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#2596be]/10 blur-[80px] md:blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-200/20 blur-[80px] md:blur-[100px] rounded-full" />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-16 gap-6 md:gap-8">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-blue-100 text-[#2596be] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6"
                  >
                    <Rocket size={14} /> The Future of Tutoring
                  </motion.div>
                  <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                    Empowering your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-blue-500">
                      teaching empire.
                    </span>
                  </h2>
                </div>
                <Link
                  href="/register?role=TUTOR"
                  className="group w-full sm:w-auto flex items-center justify-center gap-3 text-slate-700 font-bold bg-white hover:bg-slate-50 border border-slate-200 px-7 py-4 rounded-2xl transition-all shadow-sm"
                >
                  Explore all tools{' '}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                {/* Feature 1: Large Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="md:col-span-7 group p-6 md:p-10 rounded-[1.5rem] bg-white border border-blue-100/50 shadow-[0_20px_50px_-20px_rgba(37,150,190,0.1)] transition-all duration-500"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2596be] mb-6 md:mb-10">
                    <Banknote size={32} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-5 tracking-tight">
                    Keep 100% Earnings
                  </h3>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-md font-medium">
                    We don't take a cut. Your hard work belongs to you.
                    Experience the industry's most transparent payment model.
                  </p>
                </motion.div>

                {/* Feature 2: Side Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="md:col-span-5 group p-6 md:p-10 rounded-[1.5rem] bg-gradient-to-br from-white to-blue-50/30 border border-blue-100/50 shadow-sm transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#2596be]/10 flex items-center justify-center text-[#2596be] mb-6 md:mb-10">
                    <Zap size={28} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-5 tracking-tight">
                    Smart Scheduling
                  </h3>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
                    Automated booking that syncs with your timezone. Focus on
                    teaching, not emails.
                  </p>
                </motion.div>

                {/* Feature 3: Long Horizontal Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="md:col-span-12 group p-6 md:p-10 rounded-[1.5rem] bg-white border border-blue-100/50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10"
                >
                  <div className="max-w-md w-full">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                      <ShieldCheck size={28} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 tracking-tight">
                      Verified Identity
                    </h3>
                    <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                      Build instant trust with a verified badge. Premium
                      students look for quality and security.
                    </p>
                  </div>

                  {/* Avatars */}
                  <div className="flex -space-x-3 md:-space-x-4 self-start md:self-center">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 md:border-4 border-white bg-slate-100 overflow-hidden shadow-sm"
                      >
                        <img
                          src={`https://i.pravatar.cc/150?u=tutor${i}`}
                          alt="user"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 md:border-4 border-white bg-[#2596be] flex items-center justify-center font-bold text-white text-[10px] md:text-sm shadow-sm">
                      +2k
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        {/* --- TRUST SECTION --- */}
        <section className="container mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-sm font-black text-[#2596be] uppercase tracking-[0.4em] mb-4">
              Professional Toolkit
            </h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Built for high-performance.
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-5 max-w-5xl mx-auto">
            {[
              { name: 'Flexible Hours', icon: <Star size={18} /> },
              { name: 'Global Students', icon: <Globe size={18} /> },
              { name: 'Automated Payments', icon: <Banknote size={18} /> },
              { name: 'Course Builder', icon: <Layout size={18} /> },
              { name: 'Analytics', icon: <Rocket size={18} /> },
              { name: 'Live Virtual Room', icon: <Zap size={18} /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, backgroundColor: '#f8fafc' }}
                className="flex items-center w-full justify-center md:justify-start md:w-auto gap-4 px-6 md:px-10 py-5 rounded-3xl bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all cursor-default group"
              >
                <span className="text-[#2596be] group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </span>
                <span className="font-extrabold text-slate-700 text-lg">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- FINAL CTA SECTION --- */}
        <section className="container-max px-4">
          <div className="relative group overflow-hidden rounded-[1.5rem]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2596be] via-[#1e7da0] to-[#164e63] transition-all duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            <div className="relative z-10 p-10 md:p-20 flex flex-col items-center text-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-6 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.2em]"
              >
                Limited Slots Available
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                Ready to define <br className="hidden md:block" />
                <span className="text-blue-200">your future?</span>
              </h2>

              <p className="text-blue-50/80 text-base md:text-lg mb-10 max-w-xl font-medium leading-relaxed">
                Join 2,000+ elite educators today. Your journey from an educator
                to an entrepreneur starts with one click.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/register?role=TUTOR"
                  className="group px-6 sm:px-10 flex-1 w-full text-center justify-center py-3 md:py-4 bg-white text-[#2596be] hover:bg-slate-900 hover:text-white rounded-xl font-black transition-all duration-300 flex items-center gap-3 shadow-xl active:scale-95 whitespace-nowrap"
                >
                  Apply Now — It's Free
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </Link>

                <Link
                  href="/contact"
                  className="px-6 md:px-8 py-3 flex-1 w-full flex text-center justify-center md:py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-xl font-bold transition-all whitespace-nowrap"
                >
                  Talk to Experts
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4">
                {[
                  { label: 'Instant Approval', icon: '⚡' },
                  { label: 'Global Reach', icon: '🌍' },
                  { label: '24/7 Support', icon: '💬' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-blue-100/70 text-[11px] font-bold uppercase tracking-widest"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BecomeATutor;
