'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export async function updateBookingStatusAction(id: string, data: any) {
  const cookieStore = await cookies();
  
  try {
    const res = await fetch(`${API_URL}/booking/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      revalidateTag('default', 'bookings'); 
      return { success: true, data: result };
    }
    
    return { success: false, message: result.message };
  } catch (err) {
    return { success: false, message: 'Something went wrong' };
  }
}