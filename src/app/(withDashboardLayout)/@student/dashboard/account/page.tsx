import { authService } from "@/service/auth.service";
import { Student } from "@/type";
import { Mail, Calendar, ShieldCheck, User as UserIcon } from 'lucide-react';
import { ProfileActions } from "./_components/ProfileActions";

const AccountPage = async () => {
  const { data: response, error } = await authService.getMyProfile();
  const student: Student = response?.data;

  if (error || !student) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="font-bold text-slate-400">Profile not found!</p>
      </div>
    );
  }

  return (
    <div className="py-6 min-h-screen ">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2596be]/5 rounded-bl-full -z-0" />
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Avatar & Actions */}
            <ProfileActions student={student} />
          </div>

          <hr className="my-8 border-slate-100" />

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem icon={<Mail size={18}/>} label="Email Address" value={student?.email} />
            <InfoItem icon={<ShieldCheck size={18}/>} label="Account Type" value={student?.role} />
            <InfoItem 
              icon={<Calendar size={18}/>} 
              label="Joined On" 
              value={new Date(student?.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} 
            />
            <InfoItem icon={<UserIcon size={18}/>} label="Unique ID" value={`#${student?.id?.slice(-8).toUpperCase()}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for clean code 
const InfoItem = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
    <div className="text-[#2596be]">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-700">{value}</p>
    </div>
  </div>
);

export default AccountPage;