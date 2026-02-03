"use client";

import { motion } from "framer-motion";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const stories = [
  {
    name: "Alex Johnson",
    role: "Mathematics Student",
    story: "TutorFlow connected me with an incredible physics mentor. Complex topics are now easy to grasp, and my grades have improved significantly!",
    image: "https://i.pravatar.cc/150?u=alex",
    rating: 5,
    tag: "Academic Excellence",
  },
  {
    name: "Sarah Miller",
    role: "IELTS Candidate",
    story: "In just 3 months of intensive sessions, I achieved my target band score. Online learning here is more effective than any physical coaching I've tried.",
    image: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
    tag: "Language Mastery",
  },
  {
    name: "David Chen",
    role: "Software Learner",
    story: "The 1-on-1 coding sessions helped me dive deep into React. I went from a beginner to building my own full-stack applications in no time.",
    image: "https://i.pravatar.cc/150?u=david",
    rating: 5,
    tag: "Career Growth",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-10 bg-white relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container-max">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <Badge className="mb-4 bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-bold">
              Community Voices
            </Badge>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 leading-[1.1]">
              Real Results from <br /> 
              <span className="text-primary">Our Global Students</span>
            </h2>
          </div>
          <p className="text-gray-500 font-semibold max-w-[320px] text-sm md:text-right">
            Join thousands of students who have already transformed their education through personalized tutoring.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group p-8 rounded-[2.5rem] bg-secondary border border-primary/10 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              <div className="mb-6 inline-flex p-3 rounded-2xl bg-secondary text-primary">
                <Quote size={24} fill="currentColor" />
              </div>

              <div className="flex text-yellow-400 mb-6">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-slate-700 font-bold text-lg leading-relaxed mb-8">
                "{story.story}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm ring-2 ring-secondary">
                    <AvatarImage src={story.image} />
                    <AvatarFallback>{story.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-none mb-1">{story.name}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{story.role}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}