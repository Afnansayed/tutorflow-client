'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2, Star, Edit3, MessageSquare } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUpdateReviewMutation } from '@/components/Redux/RTK/reviewApi';

interface UpdateReviewProps {
  reviewId: string;
  currentRating: number;
  currentComment: string;
}

const UpdateReviewModal = ({
  reviewId,
  currentRating,
  currentComment,
}: UpdateReviewProps) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(currentRating);
  const [hover, setHover] = useState(0);
  const [updateReview, { isLoading }] = useUpdateReviewMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: currentComment,
    },
  });

  useEffect(() => {
    if (open) {
      setRating(currentRating);
    }
  }, [open, currentRating]);

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        rating: rating,
        comment: data.comment,
      };

      await updateReview({ id: reviewId, data: payload }).unwrap();
      toast.success('Review updated successfully!');
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update review');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#2596be] hover:text-[#1e7da0] transition-colors mt-5 bg-blue-50 px-3 py-1.5 rounded-lg ">
          <Edit3 size={12} /> Edit My Review
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] rounded-[2.5rem] p-8">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#2596be]/10 text-[#2596be] rounded-full flex items-center justify-center mb-4">
            <Edit3 size={32} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Update Your Feedback
          </DialogTitle>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            You can modify your rating and comment about this session.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          {/* Star Rating Interaction */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className="transition-transform active:scale-125"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    size={32}
                    className={`transition-colors ${
                      star <= (hover || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {rating} Stars Selected
            </p>
          </div>

          {/* Comment Box */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
              <MessageSquare size={12} /> Your Experience
            </label>
            <textarea
              {...register('comment', {
                required: 'Review comment cannot be empty',
              })}
              placeholder="Update your review..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 h-24 focus:outline-none focus:border-[#2596be]/50 transition-all resize-none"
            />
            {errors.comment && (
              <p className="text-[10px] text-red-500 ml-2 font-bold uppercase italic">
                {errors.comment.message as string}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="flex-[2] py-4 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                'Save Update'
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateReviewModal;
