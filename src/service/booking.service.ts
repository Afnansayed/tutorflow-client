import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export const bookingService = {
  // 1. Create Booking 
  createBooking: async function (data: any) {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to create booking');
      
      return { data: result, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message || 'Something Went Wrong' } };
    }
  },

  // 2. Update Booking Status 
  updateBookingStatus: async function (id: string, data: any) {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/booking/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to update status');

      return { data: result, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message || 'Something Went Wrong' } };
    }
  },

  // 3. Get Bookings (Dynamic for Student/Tutor/Admin)
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

  // 4. Get Booking By ID
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