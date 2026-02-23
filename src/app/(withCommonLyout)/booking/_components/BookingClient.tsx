'use client';

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { createBookingAction } from "@/actions/bookings/createBookingAction";


export const BookingClient = ({ 
  tutor, 
  scheduleData 
}: { 
  tutor: TutorProfile; 
  scheduleData: TutorSchedule[]; 
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleBookingConfirm = async () => {
    if (!selectedDate || !selectedScheduleId) {
      return toast.error("Please select both a date and a time slot!");
    }
    
    setIsSubmitting(true);
    const toastId = toast.loading("Processing your booking request...");

    try {
      const isoDate = new Date(selectedDate).toISOString();
      const payload = {
        tutor_id: tutor.user_id,
        schedule_id: selectedScheduleId,
        booking_date: isoDate
      };

      const res = await createBookingAction(payload);

      if (res.success) {
        toast.success("Booking Request Sent Successfully!", { id: toastId });
        router.push('/dashboard/bookings');
        router.refresh();
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error("Failed to process booking", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-4 py-8">
      
      {/* --- Left Column --- */}
      <div className="lg:col-span-8 space-y-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#2596be] font-bold text-xs uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            <span>Booking System</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Schedule your <span className="text-[#2596be]">Session</span>
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
              className="w-full h-16 pl-14 pr-6 bg-white border border-slate-200 rounded-3xl font-bold text-slate-700 shadow-sm focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/5 transition-all outline-none appearance-none"
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

          {scheduleData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scheduleData
                .filter(slot => slot.isAvailable && slot.isActive)
                .map((slot) => (
                  <div
                    key={slot.id}
                    onClick={() => setSelectedScheduleId(slot.id)}
                    className={`relative p-6 rounded-[1.2rem] border-2 cursor-pointer transition-all duration-300 group ${
                      selectedScheduleId === slot.id 
                      ? "border-[#2596be] bg-blue-50 ring-4 ring-blue-50/50" 
                      : "border-slate-100 bg-white hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider w-fit ${
                          selectedScheduleId === slot.id ? "bg-[#2596be] text-white" : "bg-slate-100 text-slate-500"
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
                        selectedScheduleId === slot.id ? "bg-[#2596be] border-[#2596be] scale-110" : "border-slate-200"
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