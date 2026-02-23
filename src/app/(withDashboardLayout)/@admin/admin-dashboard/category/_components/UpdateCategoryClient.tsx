'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Upload, Save } from 'lucide-react';
import { imageUpload } from '@/lib/imageUpload';
import { updateCategoryAction } from '@/actions/categories/updateCategoryAction';


interface UpdateCategoryInputs {
  name: string;
  sub_code: string;
  thumbnail?: FileList;
}

const UpdateCategoryClient = ({ category, category_id }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(category?.thumbnail || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCategoryInputs>({
    defaultValues: {
      name: category?.name,
      sub_code: category?.sub_code,
    },
  });

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: UpdateCategoryInputs) => {
    setLoading(true);
    const toastId = toast.loading('Updating category...');

    try {
      let imageUrl = category?.thumbnail;
      if (data.thumbnail && data.thumbnail.length > 0) {
        imageUrl = await imageUpload(data.thumbnail[0]);
      }

      const updatedData = {
        name: data.name,
        sub_code: data.sub_code,
        thumbnail: imageUrl,
      };

      const res = await updateCategoryAction(category_id, updatedData);

      if (res.success) {
        toast.success('Category updated successfully!', { id: toastId });
        router.push('/admin-dashboard/category');
        router.refresh();
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error('Something went wrong', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-10">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Update Category</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Modify category details and thumbnail</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Category Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:border-[#2596be]/50 focus:bg-white transition-all font-medium"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Sub Code */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Subject Code</label>
            <input
              {...register('sub_code', { required: 'Sub code is required' })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:border-[#2596be]/50 focus:bg-white transition-all font-medium uppercase"
            />
            {errors.sub_code && <p className="text-red-400 text-xs mt-1">{errors.sub_code.message}</p>}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Thumbnail</label>
            <div className="relative">
              <div className="w-full h-48 rounded-[2rem] overflow-hidden border border-slate-200 bg-slate-50 relative group">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300">No Image</div>
                )}
                <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Upload className="text-white mb-2" size={24} />
                  <span className="text-white text-xs font-bold uppercase tracking-tighter">Change Image</span>
                  <input type="file" className="hidden" accept="image/*" {...register('thumbnail', { onChange: handlePreview })} />
                </label>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold text-sm transition-all"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="flex-[2] py-4 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} /> Update Category</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryClient;