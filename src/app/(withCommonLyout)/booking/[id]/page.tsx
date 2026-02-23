import { tutorService } from "@/service/tutor.service";
import { notFound } from "next/navigation";
import { BookingClient } from "../_components/BookingClient";
import { TutorSchedule } from "@/type";
import { tutorScheduleService } from "@/service/tutorSchedule.service";


interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookingPage({ params }: Props) {
  const { id } = await params;
  const { data: response, error } = await tutorService.getTutorById(id);

  if (error || !response?.data) {
    notFound();
  }

   

  const tutor = response.data;

  const { data: scheduleRes, error: scheduleError } = await tutorScheduleService.getMyScheduleByTutorUserId(tutor?.user_id);
    const scheduleData: TutorSchedule[] = scheduleRes?.data || [];
  return (
    <div className="container mx-auto py-10">
      <BookingClient tutor={tutor} scheduleData={scheduleData} />
    </div>
  );
}