'use client';

import { motion } from 'framer-motion';
import {
  Atom,
  Code,
  Languages,
  Calculator,
  Music,
  Palette,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const categories = [
  {
    name: 'Mathematics',
    count: '120+ Tutors',
    icon: Calculator,
    color: 'text-blue-500',
  },
  {
    name: 'Science',
    count: '85+ Tutors',
    icon: Atom,
    color: 'text-purple-500',
  },
  {
    name: 'Programming',
    count: '200+ Tutors',
    icon: Code,
    color: 'text-emerald-500',
  },
  {
    name: 'Languages',
    count: '150+ Tutors',
    icon: Languages,
    color: 'text-orange-500',
  },
  {
    name: 'Digital Art',
    count: '45+ Tutors',
    icon: Palette,
    color: 'text-pink-500',
  },
  { name: 'Music', count: '60+ Tutors', icon: Music, color: 'text-rose-500' },
];

export default function SubjectCategories() {
  return (
    <section className="py-10 bg-white">
      <div className="container-max">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-bold">
              Explore Subjects
            </Badge>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">
              What do you want to <br />
              <span className="text-primary">Learn today?</span>
            </h2>
          </div>
          <button className="group flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all">
            View All Categories <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 rounded-[1.5rem] bg-secondary border border-primary/5 flex items-center justify-between hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <cat.icon
                    size={28}
                    className={cat.color + ' group-hover:text-white'}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {cat.name}
                  </h3>
                  <p className="text-sm font-semibold text-slate-400">
                    {cat.count}
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-primary transition-all shadow-sm">
                <ChevronRight size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
