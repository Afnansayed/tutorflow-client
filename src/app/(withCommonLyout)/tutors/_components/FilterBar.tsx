"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search } from "lucide-react";

export const FilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ১. সার্চ ইনপুট হ্যান্ডেল করা (Debounced যাতে প্রতি ক্লিকে API কল না হয়)
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // নতুন সার্চে ১ নম্বর পেজে নিয়ে যাওয়া ভালো
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  }, 500);

  // ২. সর্টিং হ্যান্ডেল করা
  const handleSort = (order: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortOrder", order);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-white p-4 rounded-xl border shadow-sm">
      {/* Search Input */}
      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or bio..."
          className="pl-10"
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Sort by:</span>
        <Select 
          defaultValue={searchParams.get("sortOrder") || "desc"} 
          onValueChange={handleSort}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest First</SelectItem>
            <SelectItem value="asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};