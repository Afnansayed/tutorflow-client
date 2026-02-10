"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export const FilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, 500);

  const handleSort = (order: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortOrder", order);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-primary/80 backdrop-blur-md p-2 rounded-sm md:rounded-full border border-slate-200 shadow-xl shadow-slate-100/50"
    >
      {/* search  */}
      <div className="relative w-full md:max-w-sm group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#2596be] text-slate-400">
          <Search className="size-5" />
        </div>
        <input
          placeholder="Search tutors by name, bio or skill..."
          className="w-full h-10 pl-12 pr-4 bg-white border-none rounded-[1.6rem] text-sm font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2596be]/20 transition-all"
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* sorting */}
      <div className="flex items-center gap-3 w-full md:w-auto pr-2">
        <div className="hidden sm:flex items-center gap-2 px-3 py-2  rounded-full border border-slate-100">
          <SlidersHorizontal className="size-3.5 text-white" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Sort By</span>
        </div>

        <Select 
          defaultValue={searchParams.get("sortOrder") || "desc"} 
          onValueChange={handleSort}
        >
          <SelectTrigger className="h-10 w-full md:w-[180px] rounded-full border-slate-100 bg-white font-bold text-slate-700 shadow-sm focus:ring-[#2596be]/20">
            <SelectValue placeholder="Select order" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
            <SelectItem value="desc" className="font-bold text-slate-600 focus:bg-blue-50 focus:text-[#2596be] rounded-lg">
              Newest First
            </SelectItem>
            <SelectItem value="asc" className="font-bold text-slate-600 focus:bg-blue-50 focus:text-[#2596be] rounded-lg">
              Oldest First
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};