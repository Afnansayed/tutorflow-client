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
