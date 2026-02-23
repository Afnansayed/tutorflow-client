'use server';

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export async function deleteScheduleAction(id: string) {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${API_URL}/tutor-schedule/${id}`, {
      method: 'DELETE',
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const result = await res.json();
    if (res.ok) {
      revalidateTag('default','tutor-schedule'); 
      return { success: true };
    }
    return { success: false, message: result.message || 'Delete failed' };
  } catch (err) {
    return { success: false, message: 'Server connection error' };
  }
}