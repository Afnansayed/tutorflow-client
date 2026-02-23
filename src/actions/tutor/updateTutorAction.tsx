'use server';

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export async function updateTutorAction(id: string, data: any) {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/tutor-profile/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      revalidateTag('default','tutor');
      return { success: true };
    }
    return { success: false, message: result.message || 'Update failed' };
  } catch (err) {
    return { success: false, message: 'Server Error' };
  }
}