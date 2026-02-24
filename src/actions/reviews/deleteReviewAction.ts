'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export async function deleteReviewAction(id: string) {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/review/${id}`, {
      method: 'DELETE',
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (res.ok) {
      revalidateTag('default', 'reviews');
      return { success: true };
    }

    const result = await res.json();
    return { success: false, message: result.message || 'Failed to delete review' };
  } catch (err) {
    return { success: false, message: 'Something went wrong' };
  }
}