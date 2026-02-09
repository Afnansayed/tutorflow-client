'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2, Star, MessageSquare, Award } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCreateReviewMutation } from '@/components/Redux/RTK/reviewApi';

interface RateSessionProps {
  bookingId: string | undefined;
}

const RateSessionModal = ({ bookingId }: RateSessionProps) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (rating === 0) {
      return toast.error('Please select a star rating');
    }

    try {
      const payload = {
        booking_id: bookingId,
        rating: rating,
        comment: data.comment,
      };

      await createReview(payload).unwrap();
      toast.success('Thank you for your feedback!');
      setOpen(false);
      reset();
      setRating(0);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to submit review');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="mt-2 px-6 py-2 bg-[#2596be] text-white rounded-xl text-xs font-black shadow-lg shadow-blue-100 active:scale-95 transition-all">
          Rate The Session
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] rounded-[2.5rem] p-8">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-4">
            <Award size={32} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-800">
            How was your session?
          </DialogTitle>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            Your feedback helps our tutors improve and helps other students
            choose.
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
              {rating > 0 ? `${rating} Stars Selected` : 'Select your rating'}
            </p>
          </div>

          {/* Comment Box */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
              <MessageSquare size={12} /> Share your experience
            </label>
            <textarea
              {...register('comment', { required: 'Please write a comment' })}
              placeholder="Tell us what you liked or how they can improve..."
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
              Skip
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="flex-[2] py-4 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                'Submit Review'
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RateSessionModal;
