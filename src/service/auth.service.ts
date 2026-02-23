import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export const authService = {
  // Fetch all users, optionally filtered by role
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
  // Fetch the profile of the currently authenticated user
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