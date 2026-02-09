'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Circle, Ban, Loader2 } from 'lucide-react';

export const UpdateStatusModal = ({ isOpen, onClose, onUpdate, currentStatus, isLoading, userName }: any) => {
    const statusOptions = [
        { value: 'ACTIVE', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
        { value: 'INACTIVE', icon: Circle, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
        { value: 'BANNED', icon: Ban, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200' },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] rounded-[1rem] p-8">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-xl font-black text-slate-800 uppercase tracking-tight">
                        Update User Status
                    </DialogTitle>
                    <p className="text-slate-500 text-sm font-medium mt-1">
                        Changing status for <span className="text-[#2596be] font-bold">{userName}</span>
                    </p>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-3 mt-6">
                    {statusOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = currentStatus === option.value;

                        return (
                            <button
                                key={option.value}
                                onClick={() => onUpdate(option.value)}
                                disabled={isLoading}
                                className={`flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all ${isSelected
                                        ? `${option.border} ${option.bg} shadow-sm`
                                        : 'border-slate-50 hover:border-slate-200 text-slate-400'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={20} className={isSelected ? option.color : 'text-slate-300'} />
                                    <span className={`text-xs font-black uppercase tracking-widest ${isSelected ? 'text-slate-700' : ''}`}>
                                        {option.value}
                                    </span>
                                </div>
                                {isLoading && isSelected && <Loader2 className="animate-spin text-slate-400" size={16} />}
                            </button>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
};