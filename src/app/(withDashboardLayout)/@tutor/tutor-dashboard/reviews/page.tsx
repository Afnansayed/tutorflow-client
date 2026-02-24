import { reviewService } from '@/service/review.service';
import { Review } from '@/type';
import { Star, MessageCircle, Calendar } from 'lucide-react';

const TutorReviewManagement = async () => {
  const response = await reviewService.getAllReviewTutor();
  const reviews: Review[] = response?.data?.data || [];

  return (
    <div className="py-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Student Reviews
          </h1>
          <p className="text-slate-500 text-sm">
            Check what your students are saying about your sessions.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[1rem] overflow-hidden border border-slate-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2596be]">
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Comment
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <tr
                      key={review.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {/* Student Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shadow-sm">
                            <img
                              src={review.student?.image || '/avatar.png'}
                              alt={review.student?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-bold text-slate-900">
                            {review.student?.name}
                          </span>
                        </div>
                      </td>

                      {/* Rating Stars */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < review.rating
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-200'
                              }
                            />
                          ))}
                          <span className="ml-2 text-[11px] font-black text-slate-400">
                            ({review.rating})
                          </span>
                        </div>
                      </td>

                      {/* Comment */}
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2 max-w-md">
                          <MessageCircle
                            size={14}
                            className="text-[#2596be] mt-0.5 shrink-0"
                          />
                          <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                            "{review.comment}"
                          </p>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-slate-400">
                          <Calendar size={13} />
                          {new Date(review.createdAt).toLocaleDateString(
                            'en-GB',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            }
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-slate-400 text-sm font-bold"
                    >
                      No reviews received yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorReviewManagement;