import { analyticsService } from "@/service/analytics.service";
import { Analytics } from "@/type";
import { 
  Users, 
  UserCheck, 
  CalendarCheck, 
  DollarSign, 
  ArrowUpRight, 
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";
import Link from "next/link";

const AnalyticsPage = async () => {
  const { data, error } = await analyticsService.getAnalytics();
  const analytics: Analytics | null = data?.data || null;

  if (error || !analytics) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-slate-500 font-bold">Failed to load analytics data.</p>
      </div>
    );
  }

  const stats = [
    { label: "Total Students", value: analytics.totalStudents, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Tutors", value: analytics.totalTutors, icon: UserCheck, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total Bookings", value: analytics.totalBookings, icon: CalendarCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Revenue", value: `$${analytics.totalRevenue}`, icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="min-h-screen py-10">
      <div className="container-max">
        {/* --- HEADER --- */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Platform <span className="text-[#2596be]">Analytics</span></h1>
          <p className="text-slate-500 font-medium mt-1">Real-time overview of your platform's performance.</p>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className={`${item.bg} ${item.color} p-3 rounded-2xl`}>
                  <item.icon size={24} />
                </div>
                <div className="text-slate-300 group-hover:text-[#2596be] transition-colors">
                  <ArrowUpRight size={20} />
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{item.label}</p>
                <h3 className="text-2xl font-black text-slate-800 mt-1">{item.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- RECENT BOOKINGS TABLE --- */}
          <div className="lg:col-span-2 bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-800">Recent Bookings</h2>
              <Link href="/admin-dashboard/bookings" className="text-sm font-bold text-[#2596be] hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Student/Tutor</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {analytics.recentBookings.slice(0, 5).map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800 text-sm">{booking?.student?.name|| "Student"}</span>
                          <span className="text-[11px] text-slate-400 font-medium">with {booking?.tutor?.user?.name || "Tutor"}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          booking.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 
                          booking.status === 'CANCELLED' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <Link href={`/admin-dashboard/bookings`} className="text-[#2596be] hover:text-slate-900 transition-colors">
                          <ArrowUpRight size={18} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- BOOKING STATUS SUMMARY --- */}
          <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-8">
            <h2 className="text-xl font-black text-slate-800 mb-8">Booking Summary</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl text-blue-600 shadow-sm"><Clock size={18}/></div>
                  <span className="text-sm font-bold text-slate-700">Confirmed</span>
                </div>
                <span className="text-lg font-black text-blue-700">{analytics.bookingStatus.CONFIRMED}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl text-emerald-600 shadow-sm"><CheckCircle2 size={18}/></div>
                  <span className="text-sm font-bold text-slate-700">Completed</span>
                </div>
                <span className="text-lg font-black text-emerald-700">{analytics.bookingStatus.COMPLETED}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl text-red-600 shadow-sm"><XCircle size={18}/></div>
                  <span className="text-sm font-bold text-slate-700">Cancelled</span>
                </div>
                <span className="text-lg font-black text-red-700">{analytics.bookingStatus.CANCELLED}</span>
              </div>
            </div>

            <div className="mt-10 p-6 bg-primary/80 rounded-[1.5rem] text-center">
               <p className="text-white text-xs font-bold uppercase tracking-widest mb-2">Total Volume</p>
               <h4 className="text-2xl font-black text-white">{analytics.totalBookings}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
