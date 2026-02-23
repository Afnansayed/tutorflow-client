import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetTutorParams {
  page?: string | number;
  limit?: string | number;
  search?: string;
  sortOrder?: 'asc' | 'desc';
}

export const tutorService = {
  getTutors: async function (
    params?: GetTutorParams,
    options?: ServiceOptions
  ) {
    const cookieStore = await cookies();
    try {
      const url = new URL(`${API_URL}/tutor-profile`);
      // if query value exists, then add
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      //add tags for revalidate
      config.next = { ...config.next, tags: ['tutors'] };

      const res = await fetch(url.toString(), {
        ...config,
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch tutors');
      }
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  getTutorById: async function (id: string) {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/tutor-profile/${id}`, {
        next: { tags: ['tutorDetail'] },
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch tutors');
      }
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  getMyProfile: async function () {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/tutor-profile/me`, {
        next: { tags: ['tutors'] },
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) throw new Error('Failed to fetch profile');
      
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },
};
