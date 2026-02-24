const SubjectSkeleton = () => {
    return (
        <div className="min-h-screen bg-secondary">
            {/* Header Skeleton */}
            <section className="relative py-10 overflow-hidden">
                <div className="container-max px-6 relative z-10">
                    <div className="max-w-3xl border-l-4 border-slate-200 pl-6 md:pl-8">
                        {/* Badge Skeleton */}
                        <div className="w-32 h-6 bg-slate-200 animate-pulse rounded-lg mb-4" />
                        {/* Title Skeleton */}
                        <div className="w-2/3 h-12 bg-slate-200 animate-pulse rounded-xl mb-4" />
                        {/* Description Skeleton */}
                        <div className="w-full max-w-md h-4 bg-slate-200 animate-pulse rounded mb-2" />
                        <div className="w-3/4 max-w-md h-4 bg-slate-200 animate-pulse rounded" />
                    </div>
                </div>
            </section>

            {/* Grid Skeleton */}
            <section className="container-max px-6 pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="bg-white rounded-[1.5rem] border border-slate-100 p-6 shadow-sm">
                            {/* Image Placeholder */}
                            <div className="w-full h-44 rounded-xl bg-slate-100 animate-pulse mb-6" />

                            {/* Content Placeholder */}
                            <div className="space-y-3">
                                <div className="w-3/4 h-6 bg-slate-100 animate-pulse rounded-md" />
                                <div className="space-y-2">
                                    <div className="w-full h-3 bg-slate-50 animate-pulse rounded" />
                                    <div className="w-5/6 h-3 bg-slate-50 animate-pulse rounded" />
                                </div>

                                {/* Button Placeholder */}
                                <div className="pt-4">
                                    <div className="w-24 h-4 bg-slate-100 animate-pulse rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SubjectSkeleton;