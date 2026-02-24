
const BookingTableSkeleton = () => {
  // ৫টি রো (Row) তৈরি করার জন্য একটি অ্যারে
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="py-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 px-2 animate-pulse">
          <div className="h-8 w-48 bg-slate-200 rounded-lg mb-2" />
          <div className="h-4 w-64 bg-slate-100 rounded-lg" />
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm mx-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  {['User', 'Schedule', 'Price', 'Status', 'Link', 'Action'].map((head) => (
                    <th key={head} className="px-6 py-4 text-left">
                      <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {skeletonRows.map((_, index) => (
                  <tr key={index} className="bg-white">
                    {/* User Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 animate-pulse">
                        <div className="w-10 h-10 rounded-full bg-slate-100" />
                        <div className="space-y-2">
                          <div className="h-3 w-24 bg-slate-200 rounded" />
                          <div className="h-2 w-32 bg-slate-100 rounded" />
                        </div>
                      </div>
                    </td>

                    {/* Schedule Column */}
                    <td className="px-6 py-4">
                      <div className="space-y-2 animate-pulse">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-slate-100 rounded" />
                          <div className="h-3 w-20 bg-slate-200 rounded" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-3 bg-slate-100 rounded" />
                          <div className="h-2 w-28 bg-slate-100 rounded" />
                        </div>
                      </div>
                    </td>

                    {/* Price Column */}
                    <td className="px-6 py-4">
                      <div className="h-4 w-12 bg-slate-200 rounded animate-pulse" />
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4">
                      <div className="h-6 w-20 bg-slate-100 rounded-lg animate-pulse" />
                    </td>

                    {/* Link Column */}
                    <td className="px-6 py-4">
                      <div className="h-8 w-24 bg-slate-50 rounded-lg animate-pulse ml-auto" />
                    </td>

                    {/* Action Column */}
                    <td className="px-6 py-4">
                      <div className="h-8 w-16 bg-slate-50 rounded-xl animate-pulse ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTableSkeleton;