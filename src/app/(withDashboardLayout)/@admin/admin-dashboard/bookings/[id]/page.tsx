import { Booking } from '@/type/booking.type';
import {
  Calendar,
  User,
  Tag,
  DollarSign,
  ExternalLink,
  ArrowLeft,
  Clock3,
  Video,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { timeConverter } from '@/utils/timeConverter';
import { bookingService } from '@/service/booking.service';
// পাথগুলো আপনার প্রজেক্ট অনুযায়ী চেক করে নিন
import UpdateBookingStatusModal from '@/app/(withDashboardLayout)/@tutor/tutor-dashboard/bookings/_components/UpdateBookingStatus';
import BookingReview from '@/app/(withDashboardLayout)/@tutor/tutor-dashboard/bookings/_components/BookingReview';

const AdminBookingDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  // ১. Next.js 15+ নিয়ম অনুযায়ী params await করতে হয়
  const { id } = await params;

  // ২. সরাসরি fetch সার্ভিস ব্যবহার করে ডাটা আনা
  const result = await bookingService.getBookingById(id);
  const booking: Booking = result.data?.data;
  const error = result.error;

  if (error || !booking)
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="p-4 bg-red-50 text-red-400 rounded-full">
          <Tag size={40} />
        </div>
        <p className="font-bold text-slate-400">
          {error?.message || 'Booking not found!'}
        </p>
      </div>
    );

  return (
    <div className="py-6 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 lg:px-0">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/admin-dashboard/bookings"
            className="group flex items-center gap-2 text-slate-400 hover:text-[#2596be] font-bold text-sm transition-all"
          >
            <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:border-[#2596be]/20">
              <ArrowLeft size={16} />
            </div>
            Back to Bookings
          </Link>

          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
            Management <ChevronRight size={12} />{' '}
            <span className="text-[#2596be]">Details</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Booking, Student & Tutor Profile */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute -right-10 -top-10 text-slate-50 opacity-10">
                <ShieldCheck size={200} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-[#2596be]/10 rounded-2xl flex items-center justify-center text-[#2596be]">
                    <FileText size={28} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-slate-800">
                      Booking Overview
                    </h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                      ID: {booking.trakking_code}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Student Card */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Learner Profile
                    </p>
                    <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 overflow-hidden">
                        {booking.student?.image ? (
                          <img
                            src={booking.student.image}
                            className="w-full h-full object-cover"
                            alt="student"
                          />
                        ) : (
                          <User className="w-full h-full p-4 text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-slate-800 leading-tight truncate">
                          {booking.student?.name || "N/A"}
                        </p>
                        <p className="text-slate-500 text-xs font-medium mt-1 truncate">
                          {booking.student?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tutor Card */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Tutor Profile
                    </p>
                    <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 overflow-hidden">
                        {booking.tutor?.profile_picture ? (
                          <img
                            src={booking.tutor.profile_picture}
                            className="w-full h-full object-cover"
                            alt="tutor"
                          />
                        ) : (
                          <User className="w-full h-full p-4 text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-slate-800 leading-tight truncate">
                          {booking.tutor?.user?.name || "N/A"}
                        </p>
                        <p className="text-slate-500 text-xs font-medium mt-1 truncate">
                          {booking.tutor?.user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Card */}
                  <div className="space-y-4 md:col-span-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Session Schedule
                    </p>
                    <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 flex flex-wrap gap-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#2596be] shadow-sm">
                          <Calendar size={16} />
                        </div>
                        <span className="font-bold text-slate-700 text-sm capitalize">
                          {booking.tutor_schedule?.day_of_week}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-amber-500 shadow-sm">
                          <Clock3 size={16} />
                        </div>
                        <span className="font-bold text-slate-700 text-sm tracking-tight">
                          {timeConverter(booking.tutor_schedule?.start_time)} - {timeConverter(booking.tutor_schedule?.end_time)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Link Section */}
            <div
              className={`p-1 rounded-[2rem] ${booking.session_link ? 'bg-gradient-to-r from-[#2596be] to-blue-400' : 'bg-slate-100'}`}
            >
              <div className="bg-white rounded-[1.9rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${booking.session_link ? 'bg-blue-50 text-[#2596be]' : 'bg-slate-50 text-slate-300'}`}
                  >
                    <Video size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800">Classroom Link</h4>
                    <p className="text-xs text-slate-400 font-medium">Virtual meeting room for this session</p>
                  </div>
                </div>
                {booking.session_link ? (
                  <a
                    href={booking.session_link}
                    target="_blank"
                    className="w-full md:w-auto px-8 py-4 bg-[#2596be] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#1e7da0] shadow-lg shadow-blue-100 transition-all active:scale-95"
                  >
                    Join Session <ExternalLink size={16} />
                  </a>
                ) : (
                  <div className="text-slate-300 font-bold text-xs uppercase tracking-widest italic">Link Pending</div>
                )}
              </div>
            </div>

            <BookingReview review={booking?.review} isButton={false} />
          </div>

          {/* Right Side: Payment & Status */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Financial Summary</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="text-center pb-6 border-b border-slate-100">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Amount</p>
                  <div className="flex items-center justify-center gap-1 text-4xl font-black text-slate-800">
                    <DollarSign size={28} className="text-emerald-500" />
                    {booking.total_price}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-bold flex items-center gap-2">
                      <CreditCard size={14} /> Method
                    </span>
                    <span className="text-slate-700 font-black">Digital Payment</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-bold flex items-center gap-2">
                      <Clock3 size={14} /> Status
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Status Update Modal (Client Component) */}
                <UpdateBookingStatusModal
                  bookingId={booking.id}
                  currentStatus={booking.status}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDetails;