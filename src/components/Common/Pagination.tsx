'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ totalPages, currentPage }: { totalPages: number, currentPage: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="rounded-2xl border-slate-200 h-11 w-11 p-0 hover:bg-slate-50"
      >
        <ChevronLeft size={18} />
      </Button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => handlePageChange(page)}
            className={`h-11 w-11 rounded-2xl font-black text-xs transition-all ${
              currentPage === page 
              ? "bg-[#2596be] text-white shadow-lg shadow-blue-100 border-none" 
              : "border-slate-200 text-slate-500 hover:border-[#2596be] hover:text-[#2596be]"
            }`}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="rounded-2xl border-slate-200 h-11 w-11 p-0 hover:bg-slate-50"
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  );
};