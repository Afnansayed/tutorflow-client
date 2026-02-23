import { tutorService } from "@/service/tutor.service";
import { TutorProfile } from "@/type";
import { 
  User as UserIcon, 
  Star, 
  Clock, 
  Globe, 
  Award, 
  ArrowRight, 
  Edit3 
} from 'lucide-react';
import Link from 'next/link';

const TutorAccountPage = async () => {
  const response = await tutorService.getMyProfile();
  const profileData: TutorProfile | null = response?.data?.data || null;

  return (
    <div className="min-h-screen py-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10 px-4">
        {profileData ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Brief Info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/60 text-center relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="w-32 h-32 mx-auto rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={
                        profileData.profile_picture ||
                        `https://ui-avatars.com/api/?name=${profileData.user.name}`
                      }
                      className="w-full h-full object-cover"
                      alt="Profile"
                    />
                  </div>
                  <h2 className="mt-6 text-xl font-black text-slate-800 tracking-tight">
                    {profileData.user.name}
                  </h2>
                  <p className="text-[#2596be] font-bold text-xs uppercase tracking-[0.2em] mt-1 italic">
                    Certified Tutor
                  </p>

                  <div className="mt-6 flex items-center justify-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.floor(profileData.average_rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                    <span className="text-slate-400 text-xs font-bold ml-1">
                      ({profileData.total_reviews})
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-white/60 space-y-4">
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2596be] shadow-sm">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hourly Rate</p>
                    <p className="text-sm font-bold text-slate-700">${profileData.hourly_rate}/hr</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2596be] shadow-sm">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                    <p className="text-sm font-bold text-slate-700 truncate max-w-[150px]">
                      {profileData.user.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-10 shadow-sm border border-white relative overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2596be]">
                    <Award size={24} />
                  </div>
                  <Link href={`/tutor-dashboard/account/${profileData?.id}`}>
                    <button className="flex items-center gap-2 px-5 py-2.5 hover:bg-slate-900 text-white rounded-xl text-xs font-bold bg-[#2596be] transition-all shadow-lg shadow-slate-200">
                      <Edit3 size={14} /> Edit Profile
                    </button>
                  </Link>
                </div>

                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">About Me</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{profileData.bio}</p>

                <div className="mt-12">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Subject Expertise</h3>
                  <div className="flex flex-wrap gap-3">
                    {profileData.categories?.map((cat, idx) => (
                      <div key={idx} className="px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-3 group">
                        <div className="w-2 h-2 rounded-full bg-[#2596be] group-hover:scale-150 transition-transform" />
                        <span className="text-sm font-bold text-slate-700">{cat.name}</span>
                        <span className="text-[9px] font-black text-[#2596be]/40 bg-[#2596be]/5 px-2 py-0.5 rounded-md uppercase">
                          {cat.sub_code}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-2xl mx-auto mt-10">
            <div className="bg-white rounded-[3rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-white text-center relative overflow-hidden">
              <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                <UserIcon size={40} className="text-slate-300" />
              </div>

              <h2 className="text-3xl font-black text-slate-800 mb-4">Ready to start teaching?</h2>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed px-10">
                Your profile is currently empty. Build your professional tutor brand in minutes and start reaching students.
              </p>

              <Link href="/tutor-dashboard/account/new">
                <button className="group relative px-10 py-5 bg-[#2596be] text-white rounded-[2rem] font-black text-sm uppercase tracking-widest overflow-hidden transition-all shadow-xl shadow-blue-100 active:scale-95">
                  <span className="relative z-10 flex items-center gap-2">
                    Create Profile <ArrowRight size={18} />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorAccountPage;