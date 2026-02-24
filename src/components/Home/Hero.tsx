"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <section className="relative py-10 overflow-hidden ">
            {/* Background patterns */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#2596be]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#164e63]/5 rounded-full blur-[100px]" />
            </div>

            <div className="container-max relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* --- LEFT CONTENT --- */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-left"
                    >
                        <motion.div variants={itemVariants}>
                            <Badge className="mb-6 bg-white border-slate-200 text-[#2596be] px-4 py-1.5 rounded-full shadow-sm flex items-center gap-2 w-fit">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2596be] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2596be]"></span>
                                </span>
                                2,400+ Live Classes Today
                            </Badge>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.1]">
                            Master Any Skill with <br />
                            <span className="bg-gradient-to-r from-[#2596be] to-[#164e63] bg-clip-text text-transparent">
                                Top-Tier Tutors.
                            </span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                            Experience the future of learning with our premium platform. Book verified mentors for 1-on-1 sessions and track your progress in real-time.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
                            <Button size="lg" className="rounded-full h-12 px-8 bg-[#2596be] hover:bg-[#2596be]/90 text-white shadow-xl shadow-[#2596be]/20 group">
                                Find Your Tutor
                                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button size="lg" variant="ghost" className="rounded-full h-12 px-8 font-bold text-slate-700 hover:bg-white flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#2596be]">
                                    <Play className="w-4 h-4 fill-current" />
                                </div>
                                How it Works
                            </Button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-12 flex items-center gap-6 border-t border-slate-200 pt-8">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <Avatar key={i} className="border-4 border-white w-12 h-12 shadow-sm">
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                                        <AvatarFallback>TF</AvatarFallback>
                                    </Avatar>
                                ))}
                                <div className="w-12 h-12 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                                    +10k
                                </div>
                            </div>
                            <div>
                                <div className="flex text-yellow-400 mb-1">
                                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-sm text-slate-500 font-medium">Trusted by 50,000+ students globally</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* --- RIGHT BENTO BOX DISPLAY --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative h-[500px] md:h-[600px] w-full"
                    >
                        {/* MAIN IMAGE CONTAINER */}
                        <div className="relative h-full w-full rounded-[10px] overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                                alt="Students Learning"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay for better text contrast if needed */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                        </div>

                        {/* FLOATING CARD 1: Trusted Tutors */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex items-center gap-4 max-w-[280px]"
                        >
                            <div className="bg-[#2596be]/10 p-3 rounded-2xl">
                                <Users className="w-8 h-8 text-[#2596be]" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 leading-none">500+</p>
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Verified Tutors</p>
                            </div>
                        </motion.div>

                        {/* FLOATING CARD 2: Success Rate (Top Right) */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="absolute top-10 -right-4 md:-right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3"
                        >
                            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-sm font-bold text-slate-800 tracking-tight">
                                98% Satisfaction Rate
                            </p>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}