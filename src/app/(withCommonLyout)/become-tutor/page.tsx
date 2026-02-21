'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Zap,
  ShieldCheck,
  Banknote,
  Sparkles,
  PlayCircle,
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
              <h1 className=" text-3xl lg:text-5xl  font-black text-slate-900 leading-[1.1] mb-8">
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
              <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
                TutorFlow provides the technology and students; you provide the
                inspiration. Join a global network of elite educators.
              </p>

              <div className="flex flex-wrap gap-5">
                <Link
                  href="/register?role=TUTOR"
                  className="group px-8 py-2 bg-[#2596be] hover:bg-slate-900 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-2xl shadow-[#2596be]/30 flex items-center gap-3"
                >
                  Become a Tutor{' '}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-8 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full font-bold text-lg transition-all flex items-center gap-2">
                  <PlayCircle size={20} className="text-[#2596be]" /> Watch
                  Story
                </button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8 pt-10 border-t border-slate-100">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <p className="text-2xl font-black text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-tighter">
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
                  className="w-full h-[600px] object-cover"
                />
                {/* Floating Glass Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] border border-white/50 shadow-2xl">
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

      {/* --- FEATURES SECTION --- */}
      <section className="py-32 bg-[#0f172a] text-white rounded-[1.2rem] mx-4 container-max mt-10">
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 italic">
                Empowering your <br /> teaching business.
              </h2>
              <p className="text-slate-400 text-lg">
                We've built the ultimate ecosystem for online educators to
                thrive without the administrative headache.
              </p>
            </div>
            <Link
              href="/register?role=TUTOR"
              className="text-[#2596be] font-bold flex items-center gap-2 hover:underline"
            >
              View all benefits <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Banknote size={30} />,
                title: 'Keep 100%',
                desc: "We don't take a cut of your hard-earned money. What you charge is what you get.",
              },
              {
                icon: <Zap size={30} />,
                title: 'Smart Scheduling',
                desc: 'Automated booking system that syncs with your local timezone perfectly.',
              },
              {
                icon: <ShieldCheck size={30} />,
                title: 'Verified Identity',
                desc: 'Our top-tier verification builds instant trust with high-paying students.',
              },
            ].map((box, i) => (
              <div
                key={i}
                className="group p-10 rounded-[3rem] bg-slate-800/40 border border-slate-700 hover:border-[#2596be] transition-all duration-500"
              >
                <div className="mb-8 text-[#2596be] group-hover:scale-110 transition-transform duration-500">
                  {box.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{box.title}</h3>
                <p className="text-slate-400 leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRUST SECTION --- */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-16">
            Everything you need to succeed
          </h2>
          <div className="flex flex-wrap justify-center gap-y-6 gap-x-12">
            {[
              'Flexible Hours',
              'Global Students',
              'Automated Payments',
              'Course Builder',
              'Live Virtual Room',
              'Analytics',
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <CheckCircle2 size={18} className="text-[#2596be]" />
                <span className="font-bold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="relative rounded-[4rem] bg-gradient-to-br from-[#2596be] to-[#1e7da0] p-12 md:p-24 overflow-hidden shadow-2xl shadow-[#2596be]/40">
            <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
                Ready to define <br /> your future?
              </h2>
              <p className="text-white/80 text-lg mb-12 max-w-xl font-medium">
                Application takes less than 5 minutes. Start your first session
                by tomorrow.
              </p>
              <Link
                href="/register?role=TUTOR"
                className="px-12 py-5 bg-white text-[#2596be] hover:bg-slate-900 hover:text-white rounded-full font-black text-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Apply Now — It's Free
              </Link>
            </div>
            {/* Background Abstract Shapes */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>
        </div>
      </section>

      {/* --- FOOTER-ISH MINI --- */}
      <footer className="py-12 text-center text-slate-400 text-sm font-medium">
        © 2026 TutorFlow Education Ltd. All Rights Reserved.
      </footer>
    </div>
  );
};

export default BecomeATutor;
