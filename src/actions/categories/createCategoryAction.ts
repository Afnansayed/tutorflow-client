'use server';

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

export async function createCategoryAction(data: any) {
  const cookieStore = await cookies();
  
  try {
    const res = await fetch(`${API_URL}/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(), 
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      revalidateTag('default','category'); 
      return { success: true, data: result };
    }

    return { 
      success: false, 
      message: result.message || 'Failed to create category' 
    };

  } catch (err: any) {
    return { 
      success: false, 
      message: 'Something went wrong on the server' 
    };
  }
}

