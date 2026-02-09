export interface Review {
  id: string;
  booking_id: string;
  tutor_id: string;
  student_id: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  student: ReviewStudent;
  tutor: ReviewTutor;
}

export interface ReviewStudent {
  name: string;
  image: string;
}

export interface ReviewTutor {
  id: string;
  user: ReviewUser;
}

export interface ReviewUser {
  id: string;
  name: string;
  email: string;
}
