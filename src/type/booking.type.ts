export interface Booking {
  id: string;
  tutor_id: string;
  student_id: string;
  schedule_id: string;
  booking_date: string;
  status: string;
  total_price: number;
  session_link: string;
  trakking_code: string;
  createdAt: string;
  updatedAt: string;
  student: Student;
  tutor_schedule: TutorSchedule;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface TutorSchedule {
  id: string;
  tutor_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  isAvailable: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
