'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export async function createReviewAction(payload: {
  booking_id: string | undefined;
  rating: number;
  comment: string;
}) {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${API_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message || 'Failed to submit review' };
    }
    revalidateTag('default' ,'bookings');
    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: 'Something went wrong' };
  }
}