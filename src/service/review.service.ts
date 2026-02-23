import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export const reviewService = {

  //  Get All Reviews (Admin)
  getAllReview: async function () {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/review`, {
        next: { tags: ['reviews'] },
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) throw new Error('Failed to fetch reviews');
      
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  // Get Tutor Specific Reviews
  getAllReviewTutor: async function () {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/review/tutor`, {
        next: { tags: ['reviews'] },
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) throw new Error('Failed to fetch tutor reviews');
      
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },
};