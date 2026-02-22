

export default function BookingsDetailsSkeleton() {
    return(
            <div className="py-6 min-h-screen animate-pulse">
      <div className="max-w-5xl mx-auto px-2">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-10 w-32 bg-slate-200 rounded-xl"></div>
          <div className="h-4 w-24 bg-slate-100 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm h-[350px]">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-slate-200 rounded-2xl"></div>
                <div className="space-y-2">
                  <div className="h-6 w-48 bg-slate-200 rounded"></div>
                  <div className="h-3 w-32 bg-slate-100 rounded"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-32 bg-slate-50 rounded-[1.5rem]"></div>
                <div className="h-32 bg-slate-50 rounded-[1.5rem]"></div>
              </div>
            </div>

            {/* Link Box Skeleton */}
            <div className="h-24 bg-slate-100 rounded-[2rem]"></div>
          </div>

          {/* Right Side Skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm h-[400px]">
              <div className="p-6 bg-slate-50/50 h-14"></div>
              <div className="p-8 space-y-8 flex flex-col items-center">
                <div className="w-24 h-4 bg-slate-100 rounded"></div>
                <div className="w-32 h-12 bg-slate-200 rounded"></div>
                <div className="w-full h-20 bg-slate-50 rounded-xl"></div>
                <div className="w-full h-12 bg-slate-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}