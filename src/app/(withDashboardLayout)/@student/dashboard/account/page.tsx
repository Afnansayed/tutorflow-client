'use client';

import { useState } from "react";
import { useGetMyProfileQuery} from "@/components/Redux/RTK/authApi";
import { Student } from "@/type";
import { motion } from 'framer-motion';
import { User, Mail, Calendar, ShieldCheck, Edit3, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { UpdateProfileModal } from "./_components/UpdateProfileModal";

const AccountPage = () => {
  const { data: response, isLoading } = useGetMyProfileQuery(undefined);
  const student: Student = response?.data;
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <div className="p-10 text-center font-bold text-slate-400">Loading Profile...</div>;

  return (
    <div className="py-6 min-h-screen ">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Profile Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2596be]/5 rounded-bl-full -z-0" />

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2rem] bg-slate-100 border-4 border-white shadow-xl overflow-hidden">
                {student?.image ? (
                  <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="m-auto mt-8 text-slate-300" />
                )}
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="absolute -bottom-2 -right-2 p-2 bg-[#2596be] text-white rounded-xl shadow-lg hover:scale-110 transition-transform"
              >
                <Camera size={18} />
              </button>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">{student?.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
                <span className="px-4 py-1.5 bg-blue-50 text-[#2596be] rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-100">
                  {student?.role}
                </span>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                  student?.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600'
                }`}>
                  {student?.status}
                </span>
              </div>
            </div>

            {/* Update Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
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
            <InfoItem icon={<User size={18}/>} label="Unique ID" value={`#${student?.id.slice(-8).toUpperCase()}`} />
          </div>
        </motion.div>
      </div>
      {student && (
      <UpdateProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        currentData={{
          name: student.name,
          image: student.image
        }}
      />
    )}
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