'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export async function updateMyProfileAction(data: any) {
  const cookieStore = await cookies();
  
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      revalidateTag('default' ,'auth'); 
      return { success: true, data: result };
    }
    
    return { 
      success: false, 
      message: result.message || 'Failed to update profile' 
    };
  } catch (err) {
    console.error("Profile Update Error:", err);
    return { 
      success: false, 
      message: 'Something went wrong while updating profile' 
    };
  }
}