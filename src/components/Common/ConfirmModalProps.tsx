'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isLoading?: boolean;
  variant?: 'danger' | 'warning' | 'info';
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading,
  variant = 'danger',
}: ConfirmModalProps) => {
  const btnColor =
    variant === 'danger'
      ? 'bg-rose-500 hover:bg-rose-600'
      : 'bg-[#2596be] hover:bg-[#1e7da0]';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-[2rem] p-8">
        <DialogHeader className="flex flex-col items-center text-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${variant === 'danger' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-[#2596be]'}`}
          >
            <AlertTriangle size={32} />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-800">
            {title}
          </DialogTitle>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            {description}
          </p>
        </DialogHeader>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-50 text-slate-500 rounded-2xl font-bold text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-[2] py-3 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 ${btnColor}`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              'Confirm'
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
