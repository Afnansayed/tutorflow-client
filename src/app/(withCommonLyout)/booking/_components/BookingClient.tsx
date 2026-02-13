'use client';

import { useState } from "react";
import { useGetMyScheduleByTutorUserIdQuery } from "@/components/Redux/RTK/scheduleApi";
import { TutorProfile, TutorSchedule } from "@/type";
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { timeConverter } from "@/utils/timeConverter";
import { BookingSummary } from "./BookingSummary";
import { useCreateBookingsMutation } from "@/components/Redux/RTK/bookingsApi";
import { useRouter } from "next/navigation";

export const BookingClient = ({ tutor }: { tutor: TutorProfile }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { data: scheduleResponse, isLoading } = useGetMyScheduleByTutorUserIdQuery(tutor?.user_id);
  const scheduleData: TutorSchedule[] = scheduleResponse?.data || [];
  const [createBooking]= useCreateBookingsMutation()

  const handleBookingConfirm = async () => {
    if (!selectedDate || !selectedScheduleId) {
      return toast.error("Please select both a date and a time slot!");
    }
    setIsSubmitting(true);
    try {
      // API Call logic here
      const isoDate = new Date(selectedDate).toISOString();
      const payload = {
        tutor_id: tutor.user_id,
        schedule_id: selectedScheduleId,
        booking_date: isoDate
      }
      await createBooking(payload).unwrap();
      toast.success("Booking Request Sent Successfully!");
      router.push('/dashboard/bookings')
    } catch (error: any) {
      toast.error( error?.message || error?.data?.message ||"Failed to process booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-4 py-8">
      
      {/* --- Left Column (Main Form) --- */}
      <div className="lg:col-span-8 space-y-10">
        
        {/* Header Intro */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            <span>Booking System</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Schedule your <span className="text-primary">Session</span>
          </h1>
          <p className="text-slate-500 font-medium">Choose your preferred date and time to start learning.</p>
        </div>

        {/* Step 1: Date Selection */}
        <section className="relative group">
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-[10px] font-black">01</span>
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Select Lesson Date</h3>
          </div>
          
          <div className="relative">
            <CalendarIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="date"
              min={new Date().toISOString().split('T')[0]} 
              className="w-full h-16 pl-14 pr-6 bg-white border border-slate-200 rounded-3xl font-bold text-slate-700 shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none appearance-none"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </section>

        {/* Step 2: Time Slots */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-[10px] font-black">02</span>
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Select Available Time</h3>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1,2,3,4].map(i => <div key={i} className="h-24 bg-slate-100 animate-pulse rounded-[1.2rem]" />)}
            </div>
          ) : scheduleData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scheduleData
                .filter(slot => slot.isAvailable && slot.isActive)
                .map((slot) => (
                  <div
                    key={slot.id}
                    onClick={() => setSelectedScheduleId(slot.id)}
                    className={`relative p-6 rounded-[1.2rem] border-2 cursor-pointer transition-all duration-300 group ${
                      selectedScheduleId === slot.id 
                      ? "border-primary bg-primary/5 ring-4 ring-primary/5" 
                      : "border-slate-100 bg-white hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider w-fit ${
                          selectedScheduleId === slot.id ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                        }`}>
                          {slot.day_of_week}
                        </div>
                        <div className="flex items-center gap-2 text-lg font-black text-slate-800">
                          <span>{timeConverter(slot.start_time)}</span>
                          <span className="text-xs text-slate-400">→</span>
                          <span>{timeConverter(slot.end_time)}</span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedScheduleId === slot.id ? "bg-primary border-primary scale-110" : "border-slate-200"
                      }`}>
                        {selectedScheduleId === slot.id && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
               <AlertCircle className="text-slate-300 mb-4" size={48} />
               <p className="text-slate-500 font-bold">No active schedules found for this tutor.</p>
            </div>
          )}
        </section>
      </div>

      {/* --- Right Column (Sticky Summary) --- */}
      <BookingSummary
      tutor={tutor}
      selectedDate={selectedDate}
      selectedScheduleId={selectedScheduleId}
      isSubmitting={isSubmitting}
      onConfirm={handleBookingConfirm}
    />
    </div>
  );
};