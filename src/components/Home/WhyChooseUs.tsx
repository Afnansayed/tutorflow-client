'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Zap, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const benefits = [
  {
    title: '1-on-1 Personalized Attention',
    desc: 'No crowded classrooms. Just you and your expert mentor focusing on your specific goals.',
    icon: Target,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  {
    title: 'Verified Expert Tutors',
    desc: 'Every tutor undergoes a rigorous background check and interview process for quality assurance.',
    icon: ShieldCheck,
    color: 'text-primary',
    bg: 'bg-secondary',
  },
  {
    title: 'Flexible Scheduling',
    desc: 'Learn whenever you want. Book sessions that fit your busy lifestyle across any time zone.',
    icon: Clock,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    title: 'Smart Learning Tools',
    desc: 'Our interactive whiteboard and session recordings make online learning feel natural.',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-10 bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <Badge className="mb-4 bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-bold">
              Why TutorFlow?
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-8 leading-tight">
              We make learning <br />
              <span className="text-primary">Effective & Simple.</span>
            </h2>
            <p className="text-slate-500 font-bold text-lg mb-10">
              Unlike traditional coaching, we provide a tailored experience that
              adapts to your pace and learning style.
            </p>
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-black shadow-xl hover:bg-slate-800 transition-all">
              Learn More About Us
            </button>
          </div>

          {/* Right: Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-[1.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-primary/20 transition-all group"
              >
                <div className="flex gap-2">
                  <div
                    className={`!w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon size={26} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-3">
                    {item.title}
                  </h4>
                </div>

                <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
