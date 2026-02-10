'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUpdateMyProfileMutation } from "@/components/Redux/RTK/authApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, User, Camera, Image as ImageIcon } from "lucide-react";
import { imageUpload } from "@/lib/imageUpload";


export const UpdateProfileModal = ({ isOpen, onClose, currentData }: any) => {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();
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
    try {
      let imageUrl = currentData.image;

      if (data.imageFile?.[0]) {
        imageUrl = await imageUpload(data.imageFile[0]);
      }

      const payload = {
        name: data.name,
        image: imageUrl
      };

      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully!");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] rounded-[1rem] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-800 uppercase tracking-tight">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          
          {/* Avatar Preview & File Input */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-24 h-24">
              <div className="w-full h-full rounded-[2rem] bg-slate-100 border-2 border-slate-200 overflow-hidden">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <User size={30} className="m-auto mt-6 text-slate-300" />
                )}
              </div>
              <label htmlFor="file-upload" className="absolute -bottom-1 -right-1 p-2 bg-[#2596be] text-white rounded-xl cursor-pointer shadow-lg hover:scale-110 transition-transform">
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
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-[#2596be] transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold text-xs uppercase tracking-widest">
              Cancel
            </button>
            <button 
              disabled={isUploading || isUpdating}
              type="submit" 
              className="flex-[2] py-4 bg-primary text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
            >
              {isUploading || isUpdating ? <Loader2 className="animate-spin" size={16} /> : 'Save Profile'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};