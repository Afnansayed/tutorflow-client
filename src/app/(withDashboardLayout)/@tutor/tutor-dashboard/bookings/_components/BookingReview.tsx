'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ReviewProps {
  review?: {
    rating: number;
    comment: string;
  };
  onRateClick?: () => void;
}

const BookingReview = ({ review, onRateClick }: ReviewProps) => {
  return (
    <div className="mt-6">
      {review ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-[2rem] shadow-sm relative overflow-hidden group"
        >
          {/* Decorative background star */}
          <div className="absolute -right-4 -bottom-4 text-emerald-100/50 rotate-12 group-hover:scale-110 transition-transform">
            <Star size={80} fill="currentColor" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-600">
                Student Feedback
              </p>
              <div className="flex items-center gap-0.5 bg-white px-2 py-1 rounded-full shadow-sm border border-emerald-50">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < review.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200'
                    }
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-slate-700 font-bold italic leading-relaxed">
              "{review.comment}"
            </p>

            <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-500 font-bold">
              <div className="w-4 h-1 bg-emerald-300 rounded-full" />
              Thank you for sharing!
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ y: -2 }}
          className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center text-center gap-3 transition-colors hover:border-[#2596be]/30 hover:bg-blue-50/30"
        >
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm">
            <Star size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800">No Review Yet</h4>
            <p className="text-[11px] text-slate-500 font-medium max-w-[200px] mx-auto mt-1">
              The student hasn't rated this session yet. Feedback will appear
              here.
            </p>
          </div>
          <button
            onClick={onRateClick}
            className="mt-2 px-6 py-2 bg-[#2596be] text-white rounded-xl text-xs font-black shadow-lg shadow-blue-100 active:scale-95 transition-all"
          >
            Rate The Session
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BookingReview;
