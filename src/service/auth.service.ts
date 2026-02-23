import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export const authService = {
  // ১. সকল ইউজার গেট করা
  getAllUser: async function (role?: string) {
    const cookieStore = await cookies();
    try {
      const url = new URL(`${API_URL}/users`);
      if (role) {
        url.searchParams.append('role', role);
      }

      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ['auth'] },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  // ২. ইউজারের স্ট্যাটাস আপডেট করা
  updateUserStatus: async function (userId: string, status: string) {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  // ৩. নিজের প্রোফাইল গেট করা
  getMyProfile: async function () {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ['auth'] },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },
};