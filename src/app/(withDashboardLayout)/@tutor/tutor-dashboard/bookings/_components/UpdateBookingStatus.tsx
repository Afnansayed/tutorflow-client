'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { updateBookingStatusAction } from '@/actions/bookings/updateBookingStatusAction';

enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

interface UpdateStatusProps {
  bookingId: string;
  currentStatus: string;
}

const UpdateBookingStatusModal = ({
  bookingId,
  currentStatus,
}: UpdateStatusProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      status: currentStatus as BookingStatus,
    },
  });

  const onSubmit = async (formData: { status: BookingStatus }) => {
    setIsLoading(true);
    try {
      const response = await updateBookingStatusAction(bookingId, formData);

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(`Status updated to ${formData.status}`);
      setOpen(false);
  
      router.refresh(); 
      
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 mt-4">
          Update Status
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[380px] rounded-[2.5rem] p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <RefreshCw className="text-[#2596be]" size={20} />
            Change Status
          </DialogTitle>
          <p className="text-slate-500 text-xs font-medium">
            Select the current progress of this booking.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
              <CheckCircle2 size={12} /> Select New Status
            </label>
            <select
              {...register('status', { required: true })}
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#2596be]/50 transition-all appearance-none cursor-pointer"
            >
              {Object.values(BookingStatus).map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
            <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-700 leading-relaxed font-bold">
              Important: Changing status will trigger an automated notification
              to the student.
            </p>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="flex-[2] py-4 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                'Update Now'
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBookingStatusModal;