'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const flowSteps = [
  {
    step: '01',
    title: 'Create Account',
    description:
      'Join our community of 50k+ learners. Setup your profile in minutes.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
    features: ['Social Login', 'Learning Goals'],
  },
  {
    step: '02',
    title: 'Find Your Tutor',
    description:
      'Search by subject, budget or rating. 5,000+ verified experts available.',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
    features: ['Expert Filters', 'Price Range'],
  },
  {
    step: '03',
    title: 'Book & Learn',
    description:
      'Schedule your 1-on-1 session and join our interactive live classroom.',
    image:
      'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop',
    features: ['Live Video', 'Whiteboard'],
  },
];

export default function UserFlow() {
  return (
    <section className="py-10 bg-white">
      <div className="container-max">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-bold">
              Simple 3-Step Process
            </Badge>
            <h2 className=" text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
              Start Learning in <span className="text-primary">Minutes.</span>
            </h2>
          </div>
          <p className="text-slate-500 font-bold max-w-[300px] mb-2">
            We've simplified the journey from finding a tutor to mastering a new
            skill.
          </p>
        </div>

        {/* Horizontal Flow Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {flowSteps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative h-[300px] rounded-[1.5rem] overflow-hidden mb-8 shadow-2xl shadow-slate-200/50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-6xl font-black opacity-30 block -mb-2">
                    {item.step}
                  </span>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
              </div>

              {/* Content Area */}
              <div className="px-4">
                <p className="text-slate-600 font-semibold mb-6 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  {item.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-xl text-xs font-black text-primary border border-primary/5"
                    >
                      <CheckCircle2 size={14} />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="h-px w-full bg-slate-100 relative overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    whileInView={{ x: '0%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute inset-0 bg-primary w-1/2"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-14 p-10 bg-secondary rounded-[1.5rem] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
              <Star fill="currentColor" size={28} />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900">
                After Class Experience
              </h4>
              <p className="text-slate-500 font-bold">
                Leave reviews & track your progress through our smart dashboard.
              </p>
            </div>
          </div>
          <button className="bg-primary text-white px-8 py-3 rounded-2xl font-black flex items-center gap-3 hover:gap-5 transition-all shadow-lg shadow-primary/20">
            Get Started Now <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
