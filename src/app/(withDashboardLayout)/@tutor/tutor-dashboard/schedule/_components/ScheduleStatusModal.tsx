'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, RefreshCcw, CheckCircle2, XCircle } from 'lucide-react';


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface StatusChangeProps {
  scheduleId: string;
  currentStatus: boolean;
}

const ScheduleStatusModal = ({
  scheduleId,
  currentStatus,
}: StatusChangeProps) => {
  const [open, setOpen] = useState(false);


  const handleStatusToggle = async () => {
    try {
      // আপনার দেওয়া পেলোড অনুযায়ী
      const payload = {
        isAvailable: !currentStatus,
      };


      toast.success(
        `Slot is now ${!currentStatus ? 'Available' : 'Unavailable'}`
      );
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Status update failed');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* টেবিলের স্ট্যাটাস ব্যাজটিকেই বাটন হিসেবে ব্যবহার করা হয়েছে */}
        <button className="cursor-pointer active:scale-95 transition-transform">
          {currentStatus ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[11px] font-bold uppercase tracking-wider border border-emerald-100 hover:bg-emerald-100 transition-colors">
              <CheckCircle2 size={12} />
              Available
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-400 text-[11px] font-bold uppercase tracking-wider border border-slate-100 hover:bg-slate-100 transition-colors">
              <XCircle size={12} />
              Booked
            </div>
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[380px] rounded-[2.5rem] p-8">
        <DialogHeader className="flex flex-col items-center text-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${currentStatus
                ? 'bg-amber-50 text-amber-500'
                : 'bg-emerald-50 text-emerald-500'
              }`}
          >
            <RefreshCcw size={32} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Change Status?
          </DialogTitle>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            Do you want to mark this slot as{' '}
            <span
              className={`font-black ${!currentStatus ? 'text-emerald-500' : 'text-amber-500'}`}
            >
              {!currentStatus ? 'AVAILABLE' : 'UNAVAILABLE'}
            </span>
            ?
          </p>
        </DialogHeader>

        <div className="flex gap-3 mt-8">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 py-3 bg-slate-50 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleStatusToggle}
            className={`flex-1 py-3 text-white rounded-2xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 ${!currentStatus
                ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100'
                : 'bg-[#2596be] hover:bg-[#1e7da0] shadow-blue-100'
              }`}
          >

            Confirm

          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleStatusModal;
