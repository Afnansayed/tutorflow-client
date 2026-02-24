
const AccountSkeleton = () => {
  return (
    <div className="py-6 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">

        {/* Profile Header Card Skeleton */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden animate-pulse">

          {/* Decorative Background Skeleton */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full" />

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Avatar Skeleton */}
            <div className="w-32 h-32 rounded-[2rem] bg-slate-200 border-4 border-white shadow-md" />

            {/* Basic Info Skeleton */}
            <div className="flex-1 space-y-4">
              <div className="h-8 w-48 bg-slate-200 rounded-lg mx-auto md:mx-0" />
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
                <div className="h-6 w-20 bg-slate-100 rounded-full" />
                <div className="h-6 w-24 bg-slate-100 rounded-full" />
              </div>
            </div>

            {/* Button Skeleton */}
            <div className="h-12 w-36 bg-slate-200 rounded-2xl" />
          </div>

          <hr className="my-8 border-slate-100" />

          {/* Details Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-2 w-20 bg-slate-200 rounded" />
                  <div className="h-3 w-32 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSkeleton;