'use client';

import { useGetMyScheduleQuery } from '@/components/Redux/RTK/scheduleApi';
import { TutorSchedule } from '@/type';
import { timeConverter } from '@/utils/timeConverter';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import CreateScheduleModal from './_components/CreateScheduleModal';
import UpdateScheduleModal from './_components/UpdateSchedule';

const ScheduleManagement = () => {
  const { data: scheduleResponse, isLoading } =
    useGetMyScheduleQuery(undefined);
  const schedules: TutorSchedule[] = scheduleResponse?.data || [];

  return (
    <div className="py-6  min-h-screen">
      {/* header */}
      <div className="max-w-7xl mx-auto">
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

        {/* Table start */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm mx-2"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2596be]">
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Day of Week
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Start Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    End Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Availability
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-slate-400 text-sm font-medium"
                    >
                      Loading schedules...
                    </td>
                  </tr>
                ) : schedules.length > 0 ? (
                  schedules.map(item => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {/* Day  */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:bg-white transition-colors">
                            <Calendar size={16} />
                          </div>
                          <span className="text-sm font-bold text-slate-900 capitalize">
                            {item.day_of_week}
                          </span>
                        </div>
                      </td>

                      {/* Start Time */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                          <Clock size={14} className="text-slate-300" />
                          {timeConverter(item.start_time)}
                        </div>
                      </td>

                      {/* End Time */}
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-slate-300" />
                          {timeConverter(item.end_time)}
                        </div>
                      </td>

                      {/* Availability  status*/}
                      <td className="px-6 py-4">
                        {item.isAvailable ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[11px] font-bold uppercase tracking-wider border border-emerald-100">
                            <CheckCircle size={12} />
                            Available
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-600  text-[11px] font-bold uppercase tracking-wider border border-slate-100">
                            <XCircle size={12} />
                            Booked
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <UpdateScheduleModal schedule_id={item.id} />
                          <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all rounded-lg">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-slate-400 text-sm"
                    >
                      No schedule slots found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScheduleManagement;
