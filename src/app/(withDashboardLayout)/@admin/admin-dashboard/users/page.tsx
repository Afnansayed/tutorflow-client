'use client';

import { useState } from "react";
import { useGetAllUserQuery, useUpdateUserStatusMutation } from "@/components/Redux/RTK/authApi";
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Shield, Edit, Users, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { UpdateStatusModal } from "./_components/UpdateStatusModal";


const UserManagement = () => {
  const [filterRole, setFilterRole] = useState<string | undefined>(undefined);
  const { data: userResponse, isLoading } = useGetAllUserQuery(filterRole);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const users = userResponse?.data || [];

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatus({ userId: selectedUser.id, status: newStatus }).unwrap();
      toast.success(`User is now ${newStatus}`);
      setShowStatusModal(false);
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  return (
    <div className="py-6 min-h-screen">
      <div className="max-w-7xl mx-auto ">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">User Management</h1>
            <p className="text-slate-500 text-sm font-medium">Control user access and permissions.</p>
          </div>

      <div className="flex bg-secondary p-1.5 rounded-[0.8rem] border border-slate-200 shadow-inner relative">
  {[
    { label: 'All', value: undefined, icon: Users },
    { label: 'Students', value: 'STUDENT', icon: User },
    { label: 'Tutors', value: 'TUTOR', icon: GraduationCap },
    { label: 'Admins', value: 'ADMIN', icon: Shield },
  ].map((role) => {
    const isActive = filterRole === role.value;
    return (
      <button
        key={role.label}
        onClick={() => setFilterRole(role.value)}
        className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black transition-all duration-300 z-10 ${
          isActive ? 'text-[#2596be]' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        {/* Active Background Animation */}
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-100"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        
        {/* Content (Icon & Text) */}
        <span className="relative z-20 flex items-center gap-2 uppercase tracking-[0.05em]">
          <role.icon size={15} className={isActive ? "text-[#2596be]" : "text-slate-400"} />
          <span className="hidden md:inline">{role.label}</span>
        </span>
      </button>
    );
  })}
</div>
        </div>

        {/* Table */}
        <motion.div layout className="bg-white rounded-[1.5rem] overflow-hidden border border-slate-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#2596be] text-white">
                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest">User Info</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest">Role</th>
                  <th className="px-6 py-4 text-center text-[10px] font-black uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence mode="popLayout">
                  {isLoading ? (
                    <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-bold">Loading...</td></tr>
                  ) : users.map((user: any) => (
                    <motion.tr key={user.id} layout className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                            <img src={user.image || '/avatar.png'} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">{user.name}</span>
                            <span className="text-[11px] text-slate-400 font-medium">{user.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-[10px] font-black tracking-widest bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase">
                          {user.role}
                        </span>
                      </td>

                      {/* Improved Status Badge */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                            user.status === 'ACTIVE' 
                              ? 'bg-emerald-500 text-white border-emerald-400' 
                              : user.status === 'BANNED'
                              ? 'bg-rose-50 text-rose-600 border-rose-100'
                              : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-white animate-pulse' : 'bg-current'}`} />
                            {user.status}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => { setSelectedUser(user); setShowStatusModal(true); }}
                          className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-[#2596be] hover:text-white transition-all"
                        >
                          <Edit size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {selectedUser && (
        <UpdateStatusModal
          isOpen={showStatusModal}
          onClose={() => setShowStatusModal(false)}
          onUpdate={handleStatusChange}
          currentStatus={selectedUser.status}
          isLoading={isUpdating}
          userName={selectedUser.name}
        />
      )}
    </div>
  );
};

export default UserManagement;