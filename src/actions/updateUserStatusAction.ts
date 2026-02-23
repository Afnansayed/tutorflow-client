'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export async function updateUserStatusAction(userId: string, status: string) {
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

    const result = await res.json();

    if (res.ok) {
      revalidateTag('default','users'); 
      return { success: true, data: result };
    }
    return { success: false, message: result.message || 'Failed' };
  } catch (err) {
    return { success: false, message: 'Something went wrong' };
  }
}