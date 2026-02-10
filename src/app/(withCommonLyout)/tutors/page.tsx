import { tutorService } from "@/service/tutor.service";
import { TutorProfile } from "@/type";
import { TutorCard } from "./_components/TutorCard";
import { FilterBar } from "./_components/FilterBar";


interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  
  const page = params.page as string || "1";
  const limit = params.limit as string || "12"; // একটু বেশি কার্ড দেখালে ভালো লাগে
  const search = params.search as string || "";
  const sortOrder = (params.sortOrder as "asc" | "desc") || "desc";

  const { data, error } = await tutorService.getTutors(
    { page, limit, search, sortOrder }, 
    { revalidate: 60 } 
  );

  if (error) return <div className="p-20 text-center text-red-500">Error: {error.message}</div>;

  const tutorList: TutorProfile[] = data?.data?.data || [];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header Section */}
      <section className="bg-white border-b py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Find Your Perfect Tutor
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Browse through our verified experts and book a session that fits your schedule.
          </p>
        </div>
      </section>

      {/* Tutors Grid */}
      <main className="max-w-7xl mx-auto p-6">
        <FilterBar/>
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-medium text-muted-foreground">
            Showing <span className="text-foreground font-bold">{tutorList.length}</span> results
          </p>
          {/* এখানে আপনি চাইলে একটি Sorting Dropdown রাখতে পারেন */}
        </div>

        {tutorList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tutorList.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <h2 className="text-xl font-semibold">No tutors found</h2>
             <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}