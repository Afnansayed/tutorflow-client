import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export const analyticsService = {
  getAnalytics: async function () {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/analytics`, {
        method: 'GET',
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ['analytics'] },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch analytics');
      }
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },
};