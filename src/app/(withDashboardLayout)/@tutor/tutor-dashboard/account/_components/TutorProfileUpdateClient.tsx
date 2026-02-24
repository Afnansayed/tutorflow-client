'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Upload, Check, BookOpen, DollarSign, FileText, Save } from 'lucide-react';
import { imageUpload } from '@/lib/imageUpload';
import { updateTutorAction } from '@/actions/tutor/updateTutorAction';


interface UpdateTutorInputs {
  bio: string;
  hourly_rate: number;
  thumbnail?: FileList;
  categoryIds: string[];
}

const TutorProfileUpdateClient = ({ profile, categories }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(profile?.profile_picture || null);

  const {
    register,
    handleSubmit,
    watch,
  } = useForm<UpdateTutorInputs>({
    defaultValues: {
      bio: profile?.bio,
      hourly_rate: profile?.hourly_rate,
      categoryIds: profile?.categories?.map((cat: any) => cat.id) || [],
    },
  });

  const selectedCategories = watch('categoryIds') || [];

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

      const res = await updateTutorAction(profile?.id, payload);

      if (res.success) {
        toast.success('Profile updated successfully!', { id: toastId });
        router.push('/tutor-dashboard/account');
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
    <div className="min-h-screen py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-[1.5rem] border border-slate-200/60 p-4 md:p-12 shadow-sm">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Edit Profile</h1>
            <p className="text-slate-500 text-sm font-medium">Update your professional information</p>
          </div>
          <div className="text-[10px] font-black text-[#2596be] bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
            Tutor ID: {profile?.id?.slice(0, 8)}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Picture */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Profile Picture</label>
            <div className="relative w-32 h-32 group">
              <div className="w-full h-full rounded-[2.5rem] bg-slate-50 border-2 border-slate-100 overflow-hidden flex items-center justify-center shadow-inner">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <Upload className="text-slate-300" size={24} />
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="text-white" size={20} />
                </div>
              </div>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" {...register('thumbnail', { onChange: handlePreview })} />
            </div>
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
              {...register('bio', { required: 'Bio cannot be empty' })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:border-[#2596be]/40 transition-all font-medium resize-none leading-relaxed"
            />
          </div>

          {/* Expertise Areas */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
              <BookOpen size={12} /> Expertise Areas
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat: any) => (
                <label
                  key={cat.id}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl border cursor-pointer transition-all ${selectedCategories.includes(cat.id) ? 'border-[#2596be]/30 bg-blue-50' : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'
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

          <div className="flex gap-4 pt-6">
            <button type="button" onClick={() => router.back()} className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-[2rem] font-bold text-sm">Cancel</button>
            <button disabled={loading} type="submit" className="flex-[2] py-4 bg-[#2596be] text-white rounded-[2rem] font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} /> Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TutorProfileUpdateClient;