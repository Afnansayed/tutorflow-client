'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Loader2,
  Upload,
  X,
  Check,
  BookOpen,
  DollarSign,
  FileText,
  Save,
} from 'lucide-react';
import { useGetCategoriesQuery } from '@/components/Redux/RTK/categoryApi';
import {
  useGetMyProfileQuery,
  useUpdateTutorMutation,
} from '@/components/Redux/RTK/tutorApi';
import { Category, TutorProfile } from '@/type';
import { imageUpload } from '@/lib/imageUpload';

interface UpdateTutorInputs {
  bio: string;
  hourly_rate: number;
  thumbnail?: FileList;
  categoryIds: string[];
}

const TutorProfileUpdate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { data: profileResponse, isLoading: isProfileLoading } =
    useGetMyProfileQuery(undefined);
  const { data: categoryResponse } = useGetCategoriesQuery(undefined);
  const [updateTutor] = useUpdateTutorMutation();

  const profile: TutorProfile = profileResponse?.data;
  const categories: Category[] = categoryResponse?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateTutorInputs>();

  const selectedCategories = watch('categoryIds') || [];

  useEffect(() => {
    if (profile) {
      reset({
        bio: profile.bio,
        hourly_rate: profile.hourly_rate,
        categoryIds: profile.categories?.map((cat: any) => cat.id) || [],
      });
      setPreview(profile.profile_picture);
    }
  }, [profile, reset]);

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: UpdateTutorInputs) => {
    setLoading(true);
    const toastId = toast.loading('Updating your tutor profile...');

    try {
      let imageUrl = profile?.profile_picture;

      if (data.thumbnail && data.thumbnail.length > 0) {
        imageUrl = await imageUpload(data.thumbnail[0]);
      }

      const payload = {
        bio: data.bio,
        hourly_rate: Number(data.hourly_rate),
        profile_picture: imageUrl,
        categoryIds: data.categoryIds,
      };

      await updateTutor({ id: profile?.id, data: payload }).unwrap();

      toast.success('Profile updated successfully!', { id: toastId });
      router.push('/tutor-dashboard/account');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Update failed', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (isProfileLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-400" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-[1.5rem] border border-slate-200/60 p-4 md:p-12 shadow-sm">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Edit Profile
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Update your professional information
            </p>
          </div>
          <div className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest">
            Tutor ID: {profile?.id.slice(0, 8)}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Profil  info */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Profile Picture
            </label>
            <div className="relative w-32 h-32 group">
              <div className="w-full h-full rounded-[2.5rem] bg-slate-50 border-2 border-slate-100 overflow-hidden flex items-center justify-center shadow-inner">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                ) : (
                  <Upload className="text-slate-300" size={24} />
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="text-white" size={20} />
                </div>
              </div>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                {...register('thumbnail', { onChange: handlePreview })}
              />
            </div>
            <p className="text-[9px] text-slate-400 font-medium italic">
              * Leave empty to keep the current picture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
                <DollarSign size={12} /> Hourly Rate ($)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('hourly_rate', { required: 'Required' })}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:border-primary/40 focus:bg-white transition-all font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
              <FileText size={12} /> Professional Bio
            </label>
            <textarea
              rows={4}
              {...register('bio', { required: 'Bio cannot be empty' })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:border-primary/40 focus:bg-white transition-all font-medium resize-none leading-relaxed"
            />
          </div>

          {/* selected categories*/}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
              <BookOpen size={12} /> Expertise Areas
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map(cat => (
                <label
                  key={cat.id}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedCategories.includes(cat.id)
                      ? 'border-primary/30 bg-primary/5'
                      : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">
                      {cat.name}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                      {cat.sub_code}
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      selectedCategories.includes(cat.id)
                        ? 'bg-[#2596be] border-[#2596be]'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {selectedCategories.includes(cat.id) && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    value={cat.id}
                    className="hidden"
                    {...register('categoryIds')}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-[2rem] font-bold text-sm transition-all"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="flex-[2] py-4 bg-[#2596be] hover:bg-[#1e7da0] text-white rounded-[2rem] font-bold text-sm transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TutorProfileUpdate;
