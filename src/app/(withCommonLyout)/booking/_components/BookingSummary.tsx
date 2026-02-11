'use client';

import Image from "next/image";
import { Loader2, ArrowRight, Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TutorProfile } from "@/type";

interface BookingSummaryProps {
  tutor: TutorProfile;
  selectedDate: string;
  selectedScheduleId: string;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export const BookingSummary = ({ 
  tutor, 
  selectedDate, 
  selectedScheduleId, 
  isSubmitting, 
  onConfirm 
}: BookingSummaryProps) => {
  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
      <div className="bg-[#F8FAFC] rounded-[1.2rem] p-8 text-slate-900 shadow-sm border border-slate-200/60 relative overflow-hidden">
        
        {/* Profile Section */}
        <div className="relative flex flex-col items-center text-center mb-8">
          <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-white mb-4 shadow-md">
            <Image 
              src={tutor.profile_picture || "/avatar-placeholder.png"} 
              alt="tutor" 
              fill 
              className="object-cover" 
            />
          </div>
          <h4 className="font-bold text-xl tracking-tight text-slate-800">{tutor.user?.name}</h4>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.15em] mt-1.5 flex items-center gap-1">
            <Shield size={10} className="text-slate-400" />
            Verified Tutor
          </p>
        </div>
       {/* information */}
        <div className="space-y-6 mb-10 px-2">
          <div className="flex justify-between items-end border-b border-slate-200 pb-4">
            <div className="space-y-1">
              <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Rate</span>
              <p className="text-xs font-medium text-slate-500 italic uppercase">Per hour session</p>
            </div>
            <span className="font-black text-2xl text-slate-800">${tutor.hourly_rate}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-bold text-[11px] uppercase tracking-tight">Date</span>
            <span className={`text-sm font-bold ${selectedDate ? 'text-slate-800' : 'text-slate-300'}`}>
              {selectedDate || "Pick a date"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-bold text-[11px] uppercase tracking-tight">Slot</span>
            {selectedScheduleId ? (
              <div className="flex items-center gap-1.5 text-slate-800">
                <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
                   <Check size={12} className="text-white" />
                </div>
                <span className="text-sm font-bold tracking-tight">Selected</span>
              </div>
            ) : (
              <span className="text-slate-300 text-sm font-bold">Not set</span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button 
          disabled={isSubmitting || !selectedDate || !selectedScheduleId}
          onClick={onConfirm}
          className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 border-none shadow-lg shadow-slate-900/10"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Confirm Booking
              <ArrowRight size={18} />
            </>
          )}
        </Button>

        {/* Trust Badge */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-center">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
             <span className="w-1 h-1 rounded-full bg-slate-300" />
             Safe & Secure Booking
             <span className="w-1 h-1 rounded-full bg-slate-300" />
          </p>
        </div>
      </div>
    </aside>
  );
};