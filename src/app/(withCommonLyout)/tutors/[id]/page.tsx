
import { Separator } from "@/components/ui/separator";
import { TutorProfile } from "@/type";
import Image from "next/image";
import { Star, Clock, BookOpen, DollarSign, ShieldCheck, MessageCircle, CalendarCheck, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { tutorService } from "@/service/tutor.service";
import Link from "next/link";

export default async function TutorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: response, error } = await tutorService.getTutorById(id);

  if (error || !response?.data) {
    notFound();
  }

  const tutor: TutorProfile = response.data;

  return (
    <div className="min-h-screen bg-[#fcfdfe] pb-20">
      <div className="h-40 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50" />
      <article className="container mx-auto px-4 -mt-20 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            <header className="bg-white rounded-[1.2rem] p-8 shadow-sm border border-slate-100">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-full border-8 border-white shadow-xl">
                  <Image
                    src={tutor.profile_picture || "/avatar-placeholder.png"}
                    alt={tutor.user?.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 pt-4">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">{tutor.user?.name}</h1>
                    <ShieldCheck className="text-blue-500 size-6" />
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-slate-500 font-bold text-xs uppercase tracking-widest mb-6">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="size-4 fill-current" />
                      <span>{tutor.average_rating} ({tutor.total_reviews} Reviews)</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      <span>Joined {new Date(tutor.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {tutor.categories?.map((cat) => (
                      <span key={cat.sub_code} className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100">
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={<DollarSign />} label="Hourly Rate" value={`$${tutor.hourly_rate}`} />
              <StatCard icon={<Star />} label="Rating" value={tutor.average_rating} />
              <StatCard icon={<MessageCircle />} label="Reviews" value={tutor.total_reviews} />
              <StatCard icon={<CalendarCheck />} label="Experience" value="5+ Years" />
            </div>

            {/* About Section */}
            <section className="bg-white rounded-[1.2rem] p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <BookOpen className="size-6 text-[#2596be]" /> About Me
              </h2>
              <div className="prose prose-slate max-w-none leading-relaxed text-slate-600 font-medium whitespace-pre-wrap">
                {tutor.bio}
              </div>
            </section>

            {/* Review Section */}
            <section className="bg-white rounded-[1.2rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-800">Student Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="size-5 fill-amber-500 text-amber-500" />
                  <span className="font-black text-xl">{tutor?.average_rating}</span>
                </div>
              </div>

              {tutor.reviews && tutor.reviews.length > 0 ? (
                <div className="space-y-6">
                  {tutor.reviews.map((review: any) => (
                    <div key={review.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <div className="flex gap-4 items-start mb-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-blue-100 border border-blue-200">
                          <Image
                            src={review.student?.image || "/avatar-placeholder.png"}
                            alt={review.student?.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-800">{review.student?.name}</h4>
                          <div className="flex text-amber-500 scale-75 -ml-4">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                className={`size-4 ${index < review.rating ? 'fill-current' : 'text-slate-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="ml-auto text-[10px] text-slate-400 font-bold uppercase">
                          {new Date(review.createdAt).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm italic">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    No reviews yet. Be the first to review!
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right Column */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-primary rounded-[1.2rem] p-8 text-primary-foreground shadow-2xl shadow-primary/20 transition-all">
              {/* Hourly Rate Section */}
              <div className="mb-8">
                <span className="text-primary-foreground/70 text-[10px] font-black uppercase tracking-[0.2em]">
                  Hourly Rate
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-black text-white">${tutor.hourly_rate}</span>
                  <span className="text-primary-foreground/80 font-bold">/ hour</span>
                </div>
              </div>

              {/* Actions Section */}
              <div className="space-y-4">
              <Link href={`/booking/${tutor.id}`} className="w-full">
                <Button  className="w-full bg-white text-primary hover:bg-slate-100 py-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg transition-transform active:scale-95">
                  Book Trial Session
                </Button>
                </Link>

                <Button
                  variant="outline"
                  className="w-full border-primary-foreground/30 bg-transparent hover:bg-white/10 text-white py-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all"
                >
                  Send Message
                </Button>
              </div>

              {/* Decorative Separator */}
              <Separator className="my-8 bg-primary-foreground/20" />

              {/* Meta Info Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary-foreground/90">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Clock size={18} className="text-white" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Response time: 1 hour
                  </span>
                </div>

                <div className="flex items-center gap-3 text-primary-foreground/90">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Share2 size={18} className="text-white" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Share Profile
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}

// Sub-component for Stats
const StatCard = ({ icon, label, value }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center md:text-left">
    <div className="text-[#2596be] mb-3 flex justify-center md:justify-start">{icon}</div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-lg font-black text-slate-800">{value}</p>
  </div>
);