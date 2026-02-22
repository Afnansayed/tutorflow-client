
import { Button } from '@/components/ui/button';
import { bookingService } from '@/service/booking.service';
import { Booking } from '@/type/booking.type';
import { timeConverter } from '@/utils/timeConverter';
import {
  Calendar,
  Clock,
  ExternalLink,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

// Helper function for styling (Server Side-এ রাখা যাবে)
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

const StudentBookingPage = async () => {
  const result = await bookingService.getBookings('student');
  const bookings: Booking[] = result.data?.data || [];
  const error = result.error;

  return (
    <div className="py-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 px-2">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Bookings</h1>
          <p className="text-slate-500 text-sm">Monitor your upcoming sessions</p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm mx-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2596be]">
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">Tutor</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">Schedule & Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">Session Link</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {error ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-red-500">{error.message}</td>
                  </tr>
                ) : bookings.length > 0 ? (
                  bookings.map((booking: any) => (
                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                            <img
                              src={booking?.tutor?.profile_picture || '/placeholder-user.png'}
                              alt="tutor"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">{booking?.tutor?.user?.name}</span>
                            <span className="text-[11px] text-slate-400 font-medium">{booking?.tutor?.user?.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 capitalize">
                            <Calendar size={13} className="text-[#2596be]" />
                            {booking.tutor_schedule?.day_of_week}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                            <Clock size={12} className="text-slate-300" />
                            {timeConverter(booking.tutor_schedule?.start_time)} - {timeConverter(booking.tutor_schedule?.end_time)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
                          <DollarSign size={14} className="text-emerald-500" />
                          {booking.total_price}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(booking.status)}`}>
                          {booking.status.toLowerCase() === 'confirmed' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {booking.session_link ? (
                          <a href={booking.session_link} target="_blank" className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold transition-all">
                            <ExternalLink size={14} /> Join Session
                          </a>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-300 uppercase">Link Pending</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/dashboard/bookings/${booking?.id}`}>
                          <Button variant="outline" className="h-8 px-3">
                            <Eye className="w-4 h-4 mr-1" /> View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">No bookings found.</td>
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

export default StudentBookingPage;