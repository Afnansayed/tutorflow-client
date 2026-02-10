const API_URL = process.env.NEXT_PUBLIC_API_BASE_API;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetTutorParams {
  page?: string | number;
  limit?: string | number;
  search?: string;
  sortOrder?: "asc" | "desc";
}

export const tutorService = {
  getTutors: async function (
    params?: GetTutorParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/tutor-profile`);

      // ডাইনামিক কুয়েরি প্যারামিটার হ্যান্ডলিং (আপনার স্টাইল অনুযায়ী)
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit = {};

      // ক্যাশ এবং রিভ্যালিডেশন সেটআপ
      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      // ট্যাগিং (যাতে ভবিষ্যতে revalidateTag ব্যবহার করা যায়)
      config.next = { ...config.next, tags: ["tutors"] };

      const res = await fetch(url.toString(), config);
      
      if (!res.ok) {
        throw new Error("Failed to fetch tutors");
      }

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getTutorById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/tutor-profile/${id}`, {
        next: { tags: ["tutorDetail"] }
      });

      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};