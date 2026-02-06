'use client';
import { useGetTutorBookingsQuery } from '@/components/Redux/RTK/bookingsApi';

const TutorBookingPage = () => {
  const { data: bookingResponse, isLoading } =
    useGetTutorBookingsQuery(undefined);

  return <div>Booking</div>;
};

export default TutorBookingPage;
