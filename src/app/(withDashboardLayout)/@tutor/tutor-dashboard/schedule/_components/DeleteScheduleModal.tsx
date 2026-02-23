'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Trash2, AlertTriangle } from 'lucide-react';


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteScheduleAction } from '@/actions/schedule/deleteScheduleAction';

interface DeleteScheduleProps {
  scheduleId: string;
  day: string;
  time: string;
}

const DeleteScheduleModal = ({
  scheduleId,
  day,
  time,
}: DeleteScheduleProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteScheduleAction(scheduleId);

      if (res.success) {
        toast.success('Schedule slot deleted successfully!');
        setOpen(false);
        router.refresh(); 
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all rounded-lg">
          <Trash2 size={16} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] rounded-[2.5rem] p-8">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={32} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Are you sure?
          </DialogTitle>
          <div className="text-slate-500 text-sm mt-2 font-medium">
            You are about to delete the slot for{' '}
            <span className="text-slate-900 font-bold capitalize">{day}</span>{' '}
            at <span className="text-slate-900 font-bold">{time}</span>. This
            action cannot be undone.
          </div>
        </DialogHeader>

        <div className="flex gap-3 mt-8">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 py-3 bg-slate-50 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all"
          >
            No, Keep it
          </button>
          <button
            disabled={loading}
            onClick={handleDelete}
            className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-red-100 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              'Yes, Delete'
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteScheduleModal;