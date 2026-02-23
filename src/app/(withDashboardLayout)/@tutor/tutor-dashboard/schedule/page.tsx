import { tutorScheduleService } from '@/service/tutorSchedule.service';
import { TutorSchedule } from '@/type';
import { timeConverter } from '@/utils/timeConverter';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import CreateScheduleModal from './_components/CreateScheduleModal';
import UpdateScheduleModal from './_components/UpdateSchedule';
import DeleteScheduleModal from './_components/DeleteScheduleModal';

const ScheduleManagement = async () => {
  const scheduleResponse = await tutorScheduleService.getMySchedule();
  const schedules: TutorSchedule[] = scheduleResponse?.data?.data || [];

  return (
    <div className="py-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 px-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Schedules
            </h1>
            <p className="text-slate-500 text-sm">
              Manage your weekly teaching availability and time slots
            </p>
          </div>
          <CreateScheduleModal />
        </div>

        {/* Table - Plain HTML (No Motion) */}
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm mx-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2596be]">
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">Day of Week</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">Start Time</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">End Time</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">Availability</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">Active Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {schedules.length > 0 ? (
                  schedules.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                            <Calendar size={16} />
                          </div>
                          <span className="text-sm font-bold text-slate-900 capitalize">
                            {item.day_of_week}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-slate-300" />
                          {timeConverter(item.start_time)}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-slate-300" />
                          {timeConverter(item.end_time)}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                         <Badge condition={item.isAvailable} trueT="Available" falseT="Booked" />
                      </td>

                      <td className="px-6 py-4">
                         <Badge condition={item.isActive} trueT="Active" falseT="Inactive" />
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <UpdateScheduleModal schedule_id={item.id} />
                          <DeleteScheduleModal
                            scheduleId={item.id}
                            day={item.day_of_week}
                            time={`${timeConverter(item.start_time)} - ${timeConverter(item.end_time)}`}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                      No schedule slots found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ condition, trueT, falseT }: { condition: boolean; trueT: string; falseT: string }) => (
  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${
    condition ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
  }`}>
    {condition ? <CheckCircle size={12} /> : <XCircle size={12} />}
    {condition ? trueT : falseT}
  </div>
);

export default ScheduleManagement;