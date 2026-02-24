const TutorPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-secondary/30 animate-pulse">
            {/* --- HEADER SKELETON --- */}
            <section className="pt-16 pb-12">
                <div className="container-max px-6">
                    <div className="max-w-3xl">
                        {/* Title Skeleton */}
                        <div className="h-10 md:h-14 bg-slate-200 rounded-2xl w-3/4 mb-4" />
                        {/* Subtitle Skeleton */}
                        <div className="h-4 bg-slate-200 rounded-lg w-full max-w-lg mb-2" />
                        <div className="h-4 bg-slate-200 rounded-lg w-2/3 max-w-md" />
                    </div>
                </div>
            </section>

            {/* --- SEARCH BAR SKELETON --- */}
            <section className="container-max px-6 mb-8">
                <div className="w-full h-16 bg-[#2596be]/10 rounded-full border border-[#2596be]/5 flex items-center px-6 justify-between">
                    <div className="h-8 bg-white/60 rounded-full w-1/3" />
                    <div className="flex gap-3">
                        <div className="h-8 bg-white/60 rounded-lg w-24" />
                        <div className="h-8 bg-white/60 rounded-lg w-32" />
                    </div>
                </div>
                {/* Results count skeleton */}
                <div className="mt-6 h-4 bg-slate-200 rounded w-40 px-6" />
            </section>

            {/* --- TUTOR CARDS GRID SKELETON --- */}
            <section className="container-max px-6 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden">
                            {/* Profile Image & Price Skeleton */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-20 h-20 bg-slate-100 rounded-full" />
                                <div className="w-16 h-8 bg-slate-100 rounded-xl" />
                            </div>

                            {/* Name & Badge Skeleton */}
                            <div className="space-y-3 mb-6">
                                <div className="h-6 bg-slate-100 rounded-lg w-2/3" />
                                <div className="h-4 bg-slate-50 rounded-lg w-1/2" />
                            </div>

                            {/* Bio Skeleton */}
                            <div className="space-y-2 mb-8">
                                <div className="h-3 bg-slate-50 rounded w-full" />
                                <div className="h-3 bg-slate-50 rounded w-full" />
                                <div className="h-3 bg-slate-50 rounded w-4/5" />
                            </div>

                            {/* Skills Tags Skeleton */}
                            <div className="flex gap-2 mb-8">
                                <div className="h-6 bg-slate-50 rounded-lg w-16" />
                                <div className="h-6 bg-slate-50 rounded-lg w-20" />
                            </div>

                            {/* Button Skeleton */}
                            <div className="h-12 bg-slate-100 rounded-2xl w-full" />

                            {/* Subtle Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TutorPageSkeleton;