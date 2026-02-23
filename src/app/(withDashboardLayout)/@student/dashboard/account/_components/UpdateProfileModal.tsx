'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, User, Camera } from "lucide-react";
import { imageUpload } from "@/lib/imageUpload";
import { useRouter } from "next/navigation";
import { updateMyProfileAction } from "@/actions/auth/updateMyProfileAction";


export const UpdateProfileModal = ({ isOpen, onClose, currentData }: any) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentData.image);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: currentData.name || "",
      imageFile: null,
    }
  });

  const onSubmit = async (data: any) => {
    setIsUploading(true);
    setIsUpdating(true);
    
    try {
      let imageUrl = currentData.image;
      if (data.imageFile?.[0]) {
        imageUrl = await imageUpload(data.imageFile[0]);
      }

      const payload = {
        name: data.name,
        image: imageUrl
      };
      const res = await updateMyProfileAction(payload);

      if (res.success === false) {
        throw new Error(res.message || "Failed to update profile");
      }
      toast.success("Profile updated successfully!");
      router.refresh(); 
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsUploading(false);
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] rounded-[1rem] p-8 border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-800 uppercase tracking-tight text-center">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          
          {/* Avatar Preview & File Input */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-24 h-24">
              <div className="w-full h-full rounded-[2rem] bg-slate-100 border-2 border-slate-200 overflow-hidden shadow-inner">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" alt="preview" />
                ) : (
                  <User size={30} className="m-auto mt-6 text-slate-300" />
                )}
              </div>
              <label htmlFor="file-upload" className="absolute -bottom-1 -right-1 p-2 bg-[#2596be] text-white rounded-xl cursor-pointer shadow-lg hover:scale-110 transition-transform active:scale-95">
                <Camera size={14} />
              </label>
              <input 
                id="file-upload"
                type="file" 
                accept="image/*"
                className="hidden"
                {...register('imageFile', {
                  onChange: (e) => {
                    const file = e.target.files[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }
                })}
              />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click icon to change photo</p>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 ml-1">
              <User size={12} /> Full Name
            </label>
            <input 
              {...register('name')}
              placeholder="Your full name"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-[#2596be] focus:bg-white transition-all shadow-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              disabled={isUploading || isUpdating}
              type="submit" 
              className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.15em] shadow-lg flex items-center justify-center gap-2 hover:bg-[#2596be] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading || isUpdating ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>Updating...</span>
                </>
              ) : (
                'Save Profile'
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};