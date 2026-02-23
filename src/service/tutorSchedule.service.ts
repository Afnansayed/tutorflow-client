import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export const tutorScheduleService = {
  // ২. Update Schedule
  updateSchedule: async function (id: string, data: any) {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/tutor-schedule/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to update schedule');
      return { data: result, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message || 'Something Went Wrong' } };
    }
  },

  // ৩. Update Availability Status
  updateScheduleAvailability: async function (id: string, data: any) {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/tutor-schedule/${id}/availability`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to update availability');
      return { data: result, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message || 'Something Went Wrong' } };
    }
  },

  // ৪. Get My Schedule (Current logged in tutor)
  getMySchedule: async function () {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/tutor-schedule/me`, {
        next: { tags: ['tutor-schedule'] },
        headers: { Cookie: cookieStore.toString() },
      });
      if (!res.ok) throw new Error('Failed to fetch schedules');
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  // ৫. Get Schedule By ID
  getMyScheduleById: async function (id: string) {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/tutor-schedule/${id}`, {
        next: { tags: ['tutor-schedule'] },
        headers: { Cookie: cookieStore.toString() },
      });
      if (!res.ok) throw new Error('Failed to fetch schedule details');
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  // ৬. Get Schedule By Tutor User ID (For Students/Public)
  getMyScheduleByTutorUserId: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/tutor-schedule/${id}/user`, {
        next: { tags: ['tutor-schedule'] },
      });
      if (!res.ok) throw new Error('Failed to fetch tutor schedules');
      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  // ৭. Delete Schedule
  deleteSchedule: async function (id: string) {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/tutor-schedule/${id}`, {
        method: 'DELETE',
        headers: { Cookie: cookieStore.toString() },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to delete schedule');
      return { data: result, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message || 'Something Went Wrong' } };
    }
  },
};