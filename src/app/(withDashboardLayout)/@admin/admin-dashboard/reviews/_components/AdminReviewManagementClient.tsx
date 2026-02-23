'use client';

import { useState } from 'react';
import { Review } from '@/type';
import { Star, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ConfirmationModal } from '@/components/Common/ConfirmModalProps';
import { deleteReviewAction } from '@/actions/reviews/deleteReviewAction';
import { updateReviewStatusAction } from '@/actions/reviews/updateReviewStatusAction';
import { UpdateReviewStatusModal } from './UpdateReviewStatusModal';


const AdminReviewManagementClient = ({ initialReviews }: { initialReviews: Review[] }) => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
//delete handler
  const handleDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);
    const res = await deleteReviewAction(selectedId);
    if (res.success) {
      toast.success('Review Deleted');
      setShowDeleteModal(false);
      router.refresh(); 
    } else {
      toast.error(res.message);
    }
    setIsDeleting(false);
  };

  //status handler
  const handleStatusUpdate = async (newStatus: string) => {
    if (!selectedId) return;
    const isApproved = newStatus === 'true';
    setIsUpdating(true);
    const res = await updateReviewStatusAction(selectedId, { isApproved });
    if (res.success) {
      toast.success('Status Updated');
      setShowStatusModal(false);
      router.refresh();
    } else {
      toast.error(res.message);
    }
    setIsUpdating(false);
  };

  return (
    <div className="py-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Student Reviews</h1>
          <p className="text-slate-500 text-sm">Manage student feedback and tutor ratings.</p>
        </div>

        <div className="bg-white rounded-[1rem] overflow-hidden border border-slate-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2596be]">
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Student</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Tutor</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Comment</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-widest">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {initialReviews.map(review => (
                  <tr key={review.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                          <img src={review.student?.image || '/avatar.png'} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-bold text-slate-900">{review.student?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 truncate max-w-[120px]">{review.tutor?.user?.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{review.tutor?.user?.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-600 font-medium italic line-clamp-2">"{review.comment}"</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${review.isApproved ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                        {review.isApproved ? 'Approved' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setSelectedId(review.id); setCurrentStatus(review.isApproved); setShowStatusModal(true); }} className="p-2 bg-blue-50 text-[#2596be] rounded-lg hover:bg-blue-100"><Edit size={16} /></button>
                        <button onClick={() => { setSelectedId(review.id); setShowDeleteModal(true); }} className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} isLoading={isDeleting} title="Delete Review?" description="This action is permanent and will remove the student's feedback." />
      
      <UpdateReviewStatusModal isOpen={showStatusModal} onClose={() => setShowStatusModal(false)} onUpdate={handleStatusUpdate} currentStatus={currentStatus} isLoading={isUpdating} />
    </div>
  );
};

export default AdminReviewManagementClient;