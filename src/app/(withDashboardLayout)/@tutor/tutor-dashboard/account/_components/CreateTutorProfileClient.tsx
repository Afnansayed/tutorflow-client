'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Upload, X, Check, BookOpen, DollarSign, FileText } from 'lucide-react';
import { imageUpload } from '@/lib/imageUpload';
import { createTutorAction } from '@/actions/tutor/createTutorAction';


interface CreateTutorInputs {
  bio: string;
  hourly_rate: number;
  thumbnail: FileList;
  categoryIds: string[];
}

const CreateTutorProfileClient = ({ categories }: { categories: any[] }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateTutorInputs>({
    defaultValues: {
      categoryIds: [],
    },
  });

  const selectedCategories = watch('categoryIds');

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: CreateTutorInputs) => {
    if (data.categoryIds.length === 0) {
      return toast.error('Please select at least one category');
    }

    setLoading(true);
    const toastId = toast.loading('Creating your professional profile...');

    try {
      let imageUrl = '';
      if (data.thumbnail?.[0]) {
        imageUrl = await imageUpload(data.thumbnail[0]);
      }

      const payload = {
        bio: data.bio,
        hourly_rate: Number(data.hourly_rate),
        profile_picture: imageUrl,
        categoryIds: data.categoryIds,
      };
      const res = await createTutorAction(payload);

      if (res.success) {
        toast.success('Profile created successfully!', { id: toastId });
        router.push('/tutor-dashboard/account');
        router.refresh();
      } else {
        toast.error(res.message || 'Failed to create profile', { id: toastId });
      }
    } catch (error: any) {
      toast.error('Something went wrong', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-[1.5rem] border border-slate-200/60 p-4 md:p-12 shadow-sm">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Complete Your Profile</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Provide your details to start your journey as a tutor</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Picture */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Profile Picture</label>
            <div className="relative w-32 h-32 group">
              <div className="w-full h-full rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="text-slate-300" size={24} />
                )}
              </div>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                {...register('thumbnail', { required: 'Image is required', onChange: handlePreview })}
              />
              {preview && (
                <button
                  type="button"
                  onClick={() => { setPreview(null); setValue('thumbnail', {} as FileList); }}
                  className="absolute -top-2 -right-2 p-1.5 bg-white shadow-md border border-slate-100 rounded-full text-red-400 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {errors.thumbnail && <p className="text-red-400 text-[10px] font-bold">{errors.thumbnail.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <DollarSign size={12} /> Hourly Rate ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('hourly_rate', { required: 'Hourly rate is required' })}
                placeholder="0.00"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:border-[#2596be]/40 transition-all font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
              <FileText size={12} /> Professional Bio
            </label>
            <textarea
              rows={4}
              {...register('bio', { required: 'Tell us about yourself' })}
              placeholder="Describe your experience and teaching style..."
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:border-[#2596be]/40 transition-all font-medium resize-none"
            />
          </div>

          {/* Category Select */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
              <BookOpen size={12} /> Select Your Subjects
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl border cursor-pointer transition-all ${selectedCategories.includes(cat.id) ? 'border-[#2596be] bg-blue-50 shadow-sm' : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'
                    }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{cat.name}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{cat.sub_code}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${selectedCategories.includes(cat.id) ? 'bg-[#2596be] border-[#2596be]' : 'bg-white border-slate-200'}`}>
                    {selectedCategories.includes(cat.id) && <Check size={12} className="text-white" />}
                  </div>
                  <input type="checkbox" value={cat.id} className="hidden" {...register('categoryIds')} />
                </label>
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-5 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-[2rem] font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Create Tutor Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTutorProfileClient;