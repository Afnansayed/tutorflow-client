import { Booking } from "./booking.type"

export interface Analytics {
  totalStudents: number
  totalTutors: number
  totalBookings: number
  totalRevenue: number
  recentBookings: Booking[]
  bookingStatus: BookingStatus
}

export interface BookingStatus {
  CONFIRMED: number
  CANCELLED: number
  COMPLETED: number
}
