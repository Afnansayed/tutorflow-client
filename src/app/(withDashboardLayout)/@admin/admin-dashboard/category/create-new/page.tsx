'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, X, Loader2, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { imageUpload } from '@/lib/imageUpload';

import { useRouter } from 'next/navigation';
import { createCategoryAction } from '@/actions/categories/createCategoryAction';

interface CategoryFormInputs {
  name: string;
  sub_code: string;
  thumbnail: FileList;
}

const CreateCategoryForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormInputs>();

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: CategoryFormInputs) => {
    setLoading(true);
    const toastId = toast.loading('Creating category...');

    try {
      const imageUrl = await imageUpload(data.thumbnail[0]);
      
      const payload = {
        name: data.name,
        sub_code: data.sub_code,
        thumbnail: imageUrl,
      };
      const res = await createCategoryAction(payload);
      if (res.success) {
        toast.success('Category created successfully!', { id: toastId });
        reset();
        setPreview(null);
        router.push('/admin-dashboard/category'); 
        router.refresh(); 
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error('Something went wrong during creation', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-[1rem] border border-slate-100 shadow-sm p-8 md:p-12">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Add New Category
        </h2>
        <p className="text-slate-500 text-sm mt-1 font-medium">
          Create a new subject or skill group
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Category Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
            Category Name
          </label>
          <input
            {...register('name', { required: 'Name is required' })}
            placeholder="e.g. Derivation"
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:border-[#2596be]/50 focus:bg-white transition-all font-medium"
          />
          {errors.name && (
            <p className="text-red-400 text-xs font-bold">{errors.name.message}</p>
          )}
        </div>

        {/* Subject Code */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
            Subject Code
          </label>
          <input
            {...register('sub_code', { required: 'Sub code is required' })}
            placeholder="e.g. DERI_123"
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:border-[#2596be]/50 focus:bg-white transition-all font-medium uppercase"
          />
          {errors.sub_code && (
            <p className="text-red-400 text-xs font-bold">{errors.sub_code.message}</p>
          )}
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
            Thumbnail Image
          </label>

          <div className="relative group">
            {!preview ? (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 rounded-[1rem] cursor-pointer bg-slate-50 hover:bg-slate-100/50 hover:border-[#2596be]/30 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-slate-300 mb-3" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">
                    Click to upload image
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  {...register('thumbnail', {
                    required: 'Image is required',
                    onChange: handlePreview,
                  })}
                />
              </label>
            ) : (
              <div className="relative w-full h-48 rounded-[1rem] overflow-hidden border border-slate-200">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    reset({ thumbnail: undefined });
                  }}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-red-500 rounded-full shadow-lg backdrop-blur-md transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
          {errors.thumbnail && (
            <p className="text-red-400 text-xs font-bold">{errors.thumbnail.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          type="submit"
          className="w-full py-4 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-2xl font-bold text-sm transition-all shadow-md active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Creating...
            </>
          ) : (
            <>
              <PlusCircle size={20} />
              Create Category
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;