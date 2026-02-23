import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export const categoryService = {
  //  Get All Categories
  getCategories: async function () {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/category`, {
        next: { tags: ['category'] }, 
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) throw new Error('Failed to fetch categories');
      
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },

  //  Get Category By ID
  getCategoriesById: async function (id: string) {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/category/${id}`, {
        next: { tags: ['category'] },
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) throw new Error('Failed to fetch category details');
      
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: 'Something Went Wrong' } };
    }
  },
};