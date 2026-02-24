import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export const bookingService = {
  getBookings: async function (role: 'student' | 'tutor' | 'admin' = 'admin') {
    const cookieStore = await cookies();

    // role based endpoint selection
    let endpoint = '/booking';
    if (role === 'student') endpoint = '/booking/student';
    if (role === 'tutor') endpoint = '/booking/tutor';

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        next: { tags: ['bookings'] },
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) throw new Error('Failed to fetch bookings');

      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  //  Get Booking By ID
  getBookingById: async function (id: string) {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/booking/${id}`, {
        next: { tags: ['bookings'] },
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) throw new Error('Failed to fetch booking details');

      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },
};