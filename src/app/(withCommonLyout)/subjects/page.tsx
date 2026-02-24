import { categoryService } from "@/service/categories.service";
import { Category } from "@/type";
import { BookOpen, ArrowRight, Search, GraduationCap, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const SubjectPage = async () => {
    const { data, error } = await categoryService.getCategories();
    const categories: Category[] = data?.data || [];

    if (error) {
        return (
            <div className="py-20 flex justify-center bg-secondary">
                <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-slate-400 flex items-center gap-2">
                        <AlertCircle size={16} className="text-red-400" />
                        Failed to load subjects.
                    </p>
                    <Link
                        href="/subjects"
                        className="text-[10px] font-black uppercase tracking-widest text-[#2596be] hover:text-slate-900 border-b-2 border-[#2596be]/20 hover:border-slate-900 transition-all pb-0.5"
                    >
                        Try Again
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary">
            <section className="relative py-10 overflow-hidden">

                <div className="absolute top-0 left-0 w-64 h-64 bg-[#2596be]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

                <div className="container-max px-6 relative z-10">
                    <div className="max-w-3xl border-l-4 border-[#2596be] pl-6 md:pl-8">

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white shadow-sm text-[#2596be] text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-blue-50">
                            <GraduationCap size={14} strokeWidth={3} /> Knowledge Hub
                        </div>
                        <h1 className="text-3xl lg:text-5xl  font-black text-slate-900 mb-4 tracking-tighter leading-none">
                            Explore Our
                            <span className="text-[#2596be]">Academic Subjects</span>
                        </h1>
                        <p className="text-slate-500 text-base md:text-lg max-w-xl font-medium leading-relaxed">
                            Choose your preferred category to connect with world-class tutors.
                            Your journey to mastering new skills starts here.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- SUBJECTS --- */}
            <section className="container-max px-6 pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group bg-white rounded-[1.5rem] border border-slate-200 p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(37,150,190,0.1)] transition-all duration-300"
                        >
                            {/* IMage */}
                            <div className="relative w-full h-44 rounded-xl bg-slate-50 mb-6 overflow-hidden flex items-center justify-center">
                                {category.thumbnail ? (
                                    <img
                                        src={category.thumbnail}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <BookOpen size={40} className="text-slate-200" />
                                )}
                                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-black text-slate-600 uppercase border border-slate-100">
                                    {category.sub_code || 'General'}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-[#2596be] transition-colors">
                                    {category.name}
                                </h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">
                                    Explore expert-led courses and resources in {category.name}.
                                </p>

                                <div className="pt-4 flex items-center justify-between">
                                    <Link
                                        href={`/tutors`}
                                        className="flex items-center gap-2 text-xs font-black text-[#2596be] uppercase tracking-wider"
                                    >
                                        Browse Tutors
                                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {categories.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
                        <BookOpen size={48} className="mx-auto text-slate-200 mb-4" />
                        <p className="text-slate-400 font-bold">No subjects available right now.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default SubjectPage;