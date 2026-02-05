export interface TutorProfile {
  id: string;
  user_id: string;
  bio: string;
  profile_picture: string;
  hourly_rate: number;
  total_reviews: number;
  average_rating: number;
  createdAt: string;
  updatedAt: string;
  categories: TutorCategory[];
  user: User;
}

export interface TutorCategory {
  name: string;
  sub_code: string;
}

export interface User {
  name: string;
  email: string;
}
