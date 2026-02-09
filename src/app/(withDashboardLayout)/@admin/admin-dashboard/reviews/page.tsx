'use client';
import { useState } from 'react';
import {
  useGetAllReviewQuery,
  useDeleteReviewMutation,
  useUpdateReviewStatusMutation,
} from '@/components/Redux/RTK/reviewApi';
import { Review } from '@/type';
import { motion } from 'framer-motion';
import {
  Star,
  User,
  MessageCircle,
  Calendar,
  Trash2,
  Edit,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmationModal } from '@/components/Common/ConfirmModalProps';
import { UpdateReviewStatusModal } from './_components/page';

const AdminReviewManagement = () => {
  const { data: reviewResponse, isLoading } = useGetAllReviewQuery(undefined);
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateReviewStatusMutation();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const reviews: Review[] = reviewResponse?.data || [];

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await deleteReview({ id: selectedId }).unwrap();
        toast.success('Review Deleted');
        setShowDeleteModal(false);
      } catch (err: any) {
        console.log(err);
        toast.error(err?.message || err?.data?.message);
      }
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    const isApproved = newStatus === 'true';
    if (selectedId) {
      try {
        await updateStatus({ id: selectedId, data: { isApproved } }).unwrap();
        toast.success('Status Updated');
        setShowStatusModal(false);
      } catch (err: any) {
        console.log(err);
        toast.error(err?.message || err?.data?.message);
      }
    }
  };

  return (
    <div className="py-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Student Reviews
          </h1>
          <p className="text-slate-500 text-sm">
            Manage student feedback and tutor ratings.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[1rem] overflow-hidden border border-slate-200 shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2596be]">
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">
                    Tutor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">
                    Comment
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {reviews.map(review => (
                  <tr
                    key={review.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    {/* Student */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shadow-sm">
                          {review.student?.image ? (
                            <img
                              src={review.student.image}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User
                              size={16}
                              className="m-auto mt-2 text-slate-300"
                            />
                          )}
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {review.student?.name}
                        </span>
                      </div>
                    </td>

                    {/* Tutor */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 truncate max-w-[120px]">
                          {review.tutor?.user?.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {review.tutor?.user?.email}
                        </span>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={
                              i < review.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-200'
                            }
                          />
                        ))}
                      </div>
                    </td>

                    {/* Comment */}
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2 max-w-[200px]">
                        <MessageCircle
                          size={14}
                          className="text-[#2596be] mt-0.5 shrink-0"
                        />
                        <p className="text-xs text-slate-600 font-medium italic line-clamp-2">
                          "{review.comment}"
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${review.isApproved ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}
                      >
                        {review.isApproved ? 'Approved' : 'Hidden'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedId(review.id);
                            setCurrentStatus(review.isApproved);
                            setShowStatusModal(true);
                          }}
                          className="p-2 bg-blue-50 text-[#2596be] rounded-lg hover:bg-blue-100 transition-all"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedId(review.id);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Review?"
        description="This action is permanent and will remove the student's feedback from the system."
      />

      <UpdateReviewStatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onUpdate={handleStatusUpdate}
        currentStatus={currentStatus}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default AdminReviewManagement;
