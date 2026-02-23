'use client';

import { useState } from "react";
import { User, Shield, Edit, Users, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { updateUserStatusAction } from "@/actions/updateUserStatusAction";
import { UpdateStatusModal } from "./UpdateStatusModal";


const UserManagementClient = ({ initialUsers, currentRole }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // filse set as parmas and push to url
  const handleFilter = (role: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (role) params.set('role', role);
    else params.delete('role');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await updateUserStatusAction(selectedUser.id, newStatus);
      if (res.success) {
        toast.success(`User is now ${newStatus}`);
        setShowStatusModal(false);
        router.refresh(); 
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Status update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="py-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">User Management</h1>
            <p className="text-slate-500 text-sm font-medium">Control user access and permissions.</p>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-[0.8rem] border border-slate-200 shadow-inner">
            {[
              { label: 'All', value: undefined, icon: Users },
              { label: 'Students', value: 'STUDENT', icon: User },
              { label: 'Tutors', value: 'TUTOR', icon: GraduationCap },
              { label: 'Admins', value: 'ADMIN', icon: Shield },
            ].map((role) => {
              const isActive = currentRole === role.value;
              return (
                <button
                  key={role.label}
                  onClick={() => handleFilter(role.value)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                    isActive ? 'bg-white text-[#2596be] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <role.icon size={15} />
                  <span className="hidden md:inline">{role.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[1.5rem] overflow-hidden border border-slate-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#2596be] text-white">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">User Info</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Role</th>
                  <th className="px-6 py-4 text-center text-[10px] font-black uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {initialUsers.map((user: any) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.image || '/avatar.png'} className="w-10 h-10 rounded-xl object-cover" alt="" />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800">{user.name}</span>
                          <span className="text-[11px] text-slate-400 font-medium">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase tracking-widest">{user.role}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          user.status === 'ACTIVE' ? 'bg-emerald-500 text-white' : 'bg-rose-50 text-rose-600'
                        }`}>
                          {user.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => { setSelectedUser(user); setShowStatusModal(true); }}
                        className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-[#2596be] hover:text-white transition-all"
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

export default UserManagementClient;