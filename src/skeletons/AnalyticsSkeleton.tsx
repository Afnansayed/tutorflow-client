const AnalyticsSkeleton = () => {
  return (
    <div className="min-h-screen  py-10 animate-pulse">
      <div className="container-max px-6">
        {/* --- HEADER SKELETON --- */}
        <div className="mb-10">
          <div className="h-10 bg-slate-200 rounded-xl w-48 mb-2" />
          <div className="h-4 bg-slate-200 rounded-lg w-64" />
        </div>

        {/* --- STATS GRID SKELETON --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
                <div className="w-5 h-5 bg-slate-100 rounded-md" />
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-slate-100 rounded w-20" />
                <div className="h-8 bg-slate-200 rounded-lg w-16" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- RECENT BOOKINGS TABLE SKELETON --- */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div className="h-6 bg-slate-200 rounded-lg w-32" />
              <div className="h-4 bg-slate-100 rounded-lg w-16" />
            </div>
            <div className="p-8 space-y-6">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0">
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-32" />
                    <div className="h-3 bg-slate-100 rounded w-24" />
                  </div>
                  <div className="h-6 bg-slate-100 rounded-full w-20" />
                  <div className="h-5 bg-slate-100 rounded w-5" />
                </div>
              ))}
            </div>
          </div>

          {/* --- BOOKING STATUS SUMMARY SKELETON --- */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
            <div className="h-6 bg-slate-200 rounded-lg w-40 mb-8" />
            <div className="space-y-6">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded-xl shadow-sm" />
                    <div className="h-4 bg-slate-200 rounded w-20" />
                  </div>
                  <div className="h-6 bg-slate-200 rounded w-8" />
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-slate-100 rounded-[2rem]">
               <div className="h-3 bg-slate-200 rounded w-20 mx-auto mb-2" />
               <div className="h-8 bg-slate-300 rounded-lg w-12 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSkeleton;