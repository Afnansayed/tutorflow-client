
import { categoryService } from "@/service/categories.service";
import { Category } from "@/type";
import { Plus, Edit3, Calendar, Hash, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

const CategoryPage = async () => {
  const response = await categoryService.getCategories();
  const categories: Category[] = response?.data?.data || [];

  return (
    <div className="py-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Categories
            </h1>
            <p className="text-slate-500 text-sm">
              Manage your course categories and codes
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link href={'/admin-dashboard/category/create-new'}>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95">
                <Plus size={18} />
                <span>Add New</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2596be]">
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Thumbnail
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Category Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Sub Code
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Date Created
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-widest border-b border-[#1e7da0]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                          {category.thumbnail ? (
                            <img
                              src={category.thumbnail}
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon size={18} className="text-slate-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-900">
                          {category.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Hash size={14} className="text-slate-300" />
                          {category.sub_code}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-slate-300" />
                          {new Date(category.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin-dashboard/category/${category.id}`}
                          >
                            <button className="p-2 hover:bg-blue-50 text-slate-400 hover:text-[#2596be] transition-all rounded-lg">
                              <Edit3 size={16} />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-slate-400 text-sm font-medium"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;