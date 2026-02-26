'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Clock, Calendar, Edit3 } from 'lucide-react';


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { updateScheduleAction } from '@/actions/schedule/updateScheduleAction';
import { TutorSchedule } from '@/type/booking.type';

enum DaysOfWeek {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}


interface UpdateScheduleProps {
  schedule: TutorSchedule;
}

const UpdateScheduleModal = ({ schedule }: UpdateScheduleProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: schedule,
  });

  useEffect(() => {
    if (open) {
      reset(schedule);
    }
  }, [open, schedule, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const payload = {
        day_of_week: data.day_of_week,
        start_time: data.start_time,
        end_time: data.end_time,
      };

      const res = await updateScheduleAction(schedule.id, payload);

      if (res.success) {
        toast.success('Schedule updated successfully!');
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
        <button className="p-2 hover:bg-blue-50 text-slate-400 hover:text-[#2596be] transition-all rounded-lg">
          <Edit3 size={16} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Edit3 className="text-[#2596be]" size={20} />
            Edit Time Slot
          </DialogTitle>
          <p className="text-slate-500 text-xs font-medium">
            Update your teaching hours for this slot.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
              <Calendar size={12} /> Select Day
            </label>
            <select
              {...register('day_of_week', { required: 'Day is required' })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#2596be]/50 transition-all appearance-none cursor-pointer"
            >
              {Object.values(DaysOfWeek).map(day => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            {errors.day_of_week && (
              <p className="text-red-500 text-[10px] ml-1 mt-1">{errors.day_of_week?.message as string}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <Clock size={12} /> Start Time
              </label>
              <input
                type="time"
                {...register('start_time', { required: 'Required' })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#2596be]/50 transition-all"
              />
              {errors.start_time && (
                <p className="text-red-500 text-[10px] ml-1 mt-1">{errors.start_time?.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <Clock size={12} /> End Time
              </label>
              <input
                type="time"
                {...register('end_time', { required: 'Required' })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#2596be]/50 transition-all"
              />
              {errors.end_time && (
                <p className="text-red-500 text-[10px] ml-1 mt-1">{errors.end_time?.message as string}</p>
              )}
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 py-3 bg-slate-50 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="flex-[2] py-3 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-2xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Save Changes'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateScheduleModal;