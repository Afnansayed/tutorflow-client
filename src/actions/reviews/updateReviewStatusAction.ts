'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export async function updateReviewStatusAction(id: string, statusData: any) {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/review/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(statusData),
    });

    const result = await res.json();

    if (res.ok) {
      revalidateTag('default', 'reviews');
      return { success: true, data: result };
    }
    return { success: false, message: result.message || 'Failed to update status' };
  } catch (err) {
    return { success: false, message: 'Something went wrong' };
  }
}