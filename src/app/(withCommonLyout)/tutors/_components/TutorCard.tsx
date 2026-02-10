'use client';
import { TutorProfile } from "@/type";
import { Star, ArrowRight} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export const TutorCard = ({ tutor }: { tutor: TutorProfile }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col overflow-hidden rounded-[1.2rem] border bg-white transition-all hover:shadow-2xl hover:shadow-slate-200/60"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-slate-50 shadow-sm">
            <Image
              src={tutor.profile_picture || "/avatar-placeholder.png"}
              alt={tutor.user?.name || "Tutor"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className="bg-emerald-500 text-white border-none font-black text-[10px] tracking-widest px-3 py-1.5 rounded-full shadow-sm">
              ${tutor.hourly_rate}/hr
            </Badge>
          </div>
        </div>

        <h3 className="font-black text-xl text-slate-800 tracking-tight mb-1">
          {tutor.user?.name}
        </h3>
        
        <div className="flex items-center gap-2 text-sm font-bold mb-4">
          <div className="flex items-center gap-0.5 text-amber-500">
            <Star className={`size-3.5 ${tutor.average_rating > 0 ? "fill-current" : ""}`} />
            <span>{tutor.average_rating > 0 ? tutor.average_rating : "New"}</span>
          </div>
          <span className="text-slate-200">|</span>
          <span className="text-slate-400 font-medium text-xs">{tutor.total_reviews} Reviews</span>
        </div>

        <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed font-medium">
          {tutor.bio}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tutor.categories?.slice(0, 2).map((cat, idx) => (
            <span key={idx} className="text-[9px] font-black uppercase tracking-wider text-[#2596be] bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-100">
              {cat.name}
            </span>
          ))}
          {tutor.categories?.length > 2 && (
            <span className="text-[10px] font-bold text-slate-300">+{tutor.categories.length - 2}</span>
          )}
        </div>
      </div>

      <div className="mt-auto p-6 pt-0">
        <Link href={`/tutors/${tutor.id}`} className="block">
          <Button className="w-full hover:bg-slate-900 bg-primary text-white rounded-[1.2rem] h-10 font-bold transition-all flex items-center justify-center gap-2 group/btn">
            View Profile 
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};