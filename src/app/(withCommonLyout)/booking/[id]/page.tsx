import { tutorService } from "@/service/tutor.service";
import { notFound } from "next/navigation";
import { BookingClient } from "../_components/BookingClient";


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
  return (
    <div className="container mx-auto py-10">
      <BookingClient tutor={tutor} />
    </div>
  );
}