'use client';

import { useState } from "react";
import { Camera, Edit3, User } from "lucide-react";
import { UpdateProfileModal } from "./UpdateProfileModal";
import { Student } from "@/type";

export const ProfileActions = ({ student }: { student: Student }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
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
            <div className=" text-center md:text-left">
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

        {/* This is empty space to match your previous layout or you can put the Edit button here */}
        <div className="hidden md:block flex-1" />

        {/* Update Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-[#2596be] transition-all shadow-lg"
        >
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      <UpdateProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        currentData={{
          name: student.name,
          image: student.image
        }}
      />
    </>
  );
};