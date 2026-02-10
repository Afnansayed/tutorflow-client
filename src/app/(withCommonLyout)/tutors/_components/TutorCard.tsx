import { TutorProfile } from "@/type";
import { Star, MapPin, BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const TutorCard = ({ tutor }: { tutor: TutorProfile }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md">
      {/* Profile Header */}
      <div className="p-5 flex gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary/10">
          <Image
            src={tutor.profile_picture || "/avatar-placeholder.png"}
            alt={tutor.user?.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
            {tutor.user?.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-yellow-600 font-medium">
            <Star className="size-3.5 fill-current" />
            <span>{tutor.average_rating}</span>
            <span className="text-muted-foreground">({tutor.total_reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Bio & Details */}
      <div className="px-5 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 italic">
          "{tutor.bio}"
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tutor.categories?.slice(0, 3).map((cat, idx) => (
            <Badge key={idx} variant="secondary" className="text-[10px] font-semibold tracking-wide">
              {cat.name}
            </Badge>
          ))}
          {tutor.categories?.length > 3 && (
            <span className="text-[10px] text-muted-foreground font-medium pl-1">
              +{tutor.categories.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto border-t bg-muted/30 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Hourly Rate</span>
            <span className="text-lg font-bold text-primary">${tutor.hourly_rate}</span>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="size-3" /> Joined
             </span>
             <span className="text-xs font-medium">
                {new Date(tutor.createdAt).toLocaleDateString()}
             </span>
          </div>
        </div>
        
        <Button className="w-full font-semibold" variant="default">
          View Profile
        </Button>
      </div>
    </div>
  );
};