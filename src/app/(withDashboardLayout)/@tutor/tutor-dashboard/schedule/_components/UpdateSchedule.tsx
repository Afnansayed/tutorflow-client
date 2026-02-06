'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2, Clock, Calendar, Edit3 } from 'lucide-react';
import {
  useGetMyScheduleByIdQuery,
  useUpdateScheduleMutation,
} from '@/components/Redux/RTK/scheduleApi';
import { TutorSchedule } from '@/type';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
  schedule_id: string;
}

const UpdateScheduleModal = ({ schedule_id }: UpdateScheduleProps) => {
  const [open, setOpen] = useState(false);
  const [updateSchedule, { isLoading }] = useUpdateScheduleMutation();
  const { data: scheduleResponse } = useGetMyScheduleByIdQuery(schedule_id);

  const schedule = scheduleResponse?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TutorSchedule>({
    defaultValues: schedule,
  });

  useEffect(() => {
    if (open) {
      reset(schedule);
    }
  }, [open, schedule, reset]);

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        day_of_week: data.day_of_week,
        start_time: data.start_time,
        end_time: data.end_time,
      };

      await updateSchedule({ id: schedule.id, data: payload }).unwrap();
      toast.success('Schedule updated successfully!');
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Update failed');
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
          {/* Day of Week */}
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Time */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <Clock size={12} /> Start Time
              </label>
              <input
                type="time"
                {...register('start_time', { required: 'Required' })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#2596be]/50 transition-all cursor-pointer"
              />
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <Clock size={12} /> End Time
              </label>
              <input
                type="time"
                {...register('end_time', { required: 'Required' })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#2596be]/50 transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 py-3 bg-slate-50 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="flex-[2] py-3 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateScheduleModal;
