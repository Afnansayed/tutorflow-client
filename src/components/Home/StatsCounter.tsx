'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, GraduationCap, Globe2 } from 'lucide-react';

const stats = [
  {
    label: 'Active Students',
    value: '50k+',
    icon: Users,
    desc: 'Trusting our platform',
  },
  {
    label: 'Expert Tutors',
    value: '1,200+',
    icon: GraduationCap,
    desc: 'Verified professionals',
  },
  {
    label: 'Total Subjects',
    value: '150+',
    icon: BookOpen,
    desc: 'Across all disciplines',
  },
  {
    label: 'Countries Reached',
    value: '45+',
    icon: Globe2,
    desc: 'Global learning network',
  },
];

export default function StatsCounter() {
  return (
    <section className="py-10 bg-white">
      <div className="container-max">
        <div className="bg-slate-950 rounded-[1.5rem] p-10 md:p-16 relative overflow-hidden">
          {/* Decorative Background Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                {/* Icon with Primary Glow */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-primary shadow-lg shadow-primary/5">
                  <stat.icon size={28} />
                </div>

                {/* Number & Label */}
                <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                  {stat.value}
                </h3>
                <p className="text-primary font-black text-xs uppercase tracking-[0.2em] mb-3">
                  {stat.label}
                </p>

                {/* Small Description */}
                <p className="text-slate-500 text-sm font-bold">{stat.desc}</p>

                {/* Bottom Accent Line */}
                {index !== stats.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-px h-24 bg-white/10 -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
