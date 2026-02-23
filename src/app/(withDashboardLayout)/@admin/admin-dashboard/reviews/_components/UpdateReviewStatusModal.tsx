'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';

export const UpdateReviewStatusModal = ({
  isOpen,
  onClose,
  onUpdate,
  currentStatus,
  isLoading,
}: any) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { isApproved: currentStatus },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-[2rem] p-8">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-center">
            Change Approval Status
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(data => onUpdate(data.isApproved))}
          className="space-y-6 mt-4"
        >
          <select
            {...register('isApproved')}
            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none"
          >
            <option value="true">Approved (Visible to All)</option>
            <option value="false">Hidden (Draft/Pending)</option>
          </select>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-4 bg-[#2596be] text-white rounded-2xl font-bold text-sm shadow-lg"
          >
            {isLoading ? 'Updating...' : 'Save Changes'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
