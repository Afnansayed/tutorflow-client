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
}

export interface ReviewStudent {
  name: string;
  image: string;
}
