import { ChevronRight, GraduationCap, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { categoryService } from '@/service/categories.service';
import { Category } from '@/type';
import Link from 'next/link';

export default async function SubjectCategories() {

  const { data, error } = await categoryService.getCategories();
  const categories: Category[] = data?.data || [];

  if (error || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-max px-6">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl text-left">
            <Badge className="mb-4 bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-bold">
              Explore Subjects
            </Badge>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 leading-[1.1]">
              What do you want to <br />
              <span className="text-primary">Learn today?</span>
            </h2>
          </div>
          <Link
            href="/subjects"
            className="group flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all"
          >
            View All Categories <ChevronRight size={20} />
          </Link>
        </div>

        {/* category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/subjects/${cat.id}`}
              className="group p-6 rounded-[1.5rem] bg-secondary/50 border border-slate-100 flex items-center justify-between hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden border border-slate-50">
                  {cat.thumbnail ? (
                    <img
                      src={cat.thumbnail}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <GraduationCap size={28} className="text-primary" />
                  )}
                </div>

                <div>
                  <h3 className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    {cat.sub_code || 'Academic'}
                  </p>
                </div>
              </div>


            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}