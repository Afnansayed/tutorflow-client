'use client';

import React from 'react';
import { Send, Bell, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Newsletter() {
  return (
    <section className="py-10 bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary rounded-[1.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 border border-primary/10 relative overflow-hidden shadow-xl shadow-primary/5"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 opacity-60" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white rounded-full blur-[80px] -z-10 opacity-50" />

          <div className="max-w-xl relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles size={14} className="animate-pulse" />
              Weekly Updates
            </div>

            <h3 className="text-4xl  font-black tracking-tighter text-slate-900 mb-6 leading-tight">
              Stay in the <span className="text-primary italic">Flow</span> of
              Learning
            </h3>
            <p className="text-slate-600 font-bold  leading-relaxed">
              Join 10,000+ students. Get curated learning paths, new tutor
              alerts, and exclusive discounts directly in your inbox.
            </p>
          </div>

          <div className="w-full lg:max-w-md relative z-10">
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-[1.5rem] border border-primary/10 shadow-sm">
              <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Bell size={18} className="text-primary mr-3" />
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="bg-transparent py-3 outline-none w-full text-sm font-bold text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 h-12 font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 border-none">
                <Send size={18} className="mr-2" />
                Subscribe
              </Button>
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-4 text-center lg:text-left uppercase tracking-widest">
              No spam, ever. Unsubscribe anytime with one click.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
