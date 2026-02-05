'use client';

import { useGetCategoriesQuery } from '@/components/Redux/RTK/categoryApi';
import { Category } from '@/type';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Hash,
  Image as ImageIcon,
} from 'lucide-react';

const CategoryPage = () => {
  const { data: categoryResponse, isLoading } =
    useGetCategoriesQuery(undefined);
  const categories: Category[] = categoryResponse?.data || [];

  return (
    <div className="py-6 bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto">
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
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95">
              <Plus size={18} />
              <span className="hidden sm:inline">Add New</span>
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
        >
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
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-slate-400 text-sm font-medium"
                    >
                      Loading data...
                    </td>
                  </tr>
                ) : categories.length > 0 ? (
                  categories.map(category => (
                    <tr
                      key={category.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                          {category.thumbnail ? (
                            <img
                              src={category.thumbnail}
                              alt=""
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
                          <button className="p-2 hover:bg-blue-50 text-slate-400 hover:text-primary transition-all rounded-lg">
                            <Edit3 size={16} />
                          </button>
                          <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all rounded-lg">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-slate-400 text-sm"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;
