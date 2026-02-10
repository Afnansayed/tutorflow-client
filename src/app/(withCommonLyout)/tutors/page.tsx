import { tutorService } from "@/service/tutor.service";
import { TutorProfile } from "@/type";
import { TutorCard } from "./_components/TutorCard";
import { FilterBar } from "./_components/FilterBar";
import { Pagination } from "@/components/Common/Pagination";
import { Star } from "lucide-react";


interface ExploreTutorProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: ExploreTutorProps) {
  const params = await searchParams;
  
  const page = params.page as string || "1";
  const limit = params.limit as string || "8";
  const search = params.search as string || "";
  const sortOrder = (params.sortOrder as "asc" | "desc") || "desc";

  const { data, error } = await tutorService.getTutors(
    { page, limit, search, sortOrder }, 
    { revalidate: 60 } 
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-10 bg-white rounded-3xl border shadow-sm">
        <h2 className="text-xl font-black text-rose-500">Error Loading Tutors</h2>
        <p className="text-slate-500 mt-2">{error.message}</p>
      </div>
    </div>
  );


  const tutorList: TutorProfile[] = data?.data?.data || [];
  const meta = data?.data?.meta;

  return (
    <div className="min-h-screen bg-[#fcfdfe] pb-24">
      {/* Header */}
      <section className="bg-secondary border-b pt-20 pb-16 px-6 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2596be]/5 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">
            Find Your <span className="text-[#2596be]">Perfect</span> Tutor
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl font-medium leading-relaxed">
            Professional experts ready to help you master any subject. Verified reviews and flexible scheduling.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 -mt-10 relative z-20">
        <FilterBar />
        
        <div className="flex items-center justify-between mb-8 px-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Results: <span className="text-slate-900">{meta?.total || 0} Tutors found</span>
          </p>
        </div>

        {tutorList.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {tutorList.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
            
            <Pagination 
              totalPages={meta?.totalPages || 1} 
              currentPage={Number(page)} 
            />
          </>
        ) : (
          <div className="bg-white rounded-[1.2rem] border border-dashed border-slate-200 py-40 text-center shadow-sm">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-slate-200" size={32} />
             </div>
             <h2 className="text-2xl font-black text-slate-800">No Experts Found</h2>
             <p className="text-slate-400 font-medium mt-2">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}