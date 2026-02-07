'use client';

import {
  useGetAdminBookingsQuery,
  useGetStudentBookingsQuery,
  useGetTutorBookingsQuery,
} from '@/components/Redux/RTK/bookingsApi';
import { Button } from '@/components/ui/button';
import { Booking } from '@/type/booking.type';
import { timeConverter } from '@/utils/timeConverter';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  ExternalLink,
  DollarSign,
  Tag,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

const StudentBookingPage = () => {
  const { data: bookingResponse, isLoading } =
    useGetAdminBookingsQuery(undefined);
  const bookings: Booking[] = bookingResponse?.data || [];

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'completed':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="py-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 px-2">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            My Bookings
          </h1>
          <p className="text-slate-500 text-sm">
            Monitor your upcoming sessions and student appointments
          </p>
        </div>

        {/* Table Section */}
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
                    Tutor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Schedule & Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Session Link
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Action
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
                      Loading bookings...
                    </td>
                  </tr>
                ) : bookings.length > 0 ? (
                  bookings.map(booking => (
                    <tr
                      key={booking.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {/* Student Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                            {booking.tutor?.profile_picture ? (
                              <img
                                src={booking?.tutor?.profile_picture}
                                alt={booking?.tutor?.user_id}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <User size={20} />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">
                              {booking?.tutor?.user?.name}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium lowercase tracking-tight">
                              {booking?.tutor?.user.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Schedule Info */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 capitalize">
                            <Calendar size={13} className="text-[#2596be]" />
                            {booking.tutor_schedule?.day_of_week}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                            <Clock size={12} className="text-slate-300" />
                            {timeConverter(
                              booking.tutor_schedule?.start_time
                            )}{' '}
                            - {timeConverter(booking.tutor_schedule?.end_time)}
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
                          <DollarSign size={14} className="text-emerald-500" />
                          {booking.total_price}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(booking.status)}`}
                        >
                          {booking.status.toLowerCase() === 'confirmed' ? (
                            <CheckCircle2 size={12} />
                          ) : (
                            <AlertCircle size={12} />
                          )}
                          {booking.status}
                        </span>
                      </td>

                      {/* Session Link / Actions */}
                      <td className="px-6 py-4 text-right">
                        {booking.session_link ? (
                          <a
                            href={booking.session_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all"
                          >
                            <ExternalLink size={14} />
                            Join Session
                          </a>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                            Link Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin-dashboard/bookings/${booking?.id}`}>
                          <Button className="py-1 rounded-xl">
                            <Eye /> View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-slate-400 text-sm"
                    >
                      No bookings found yet.
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

export default StudentBookingPage;
