'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  MapPin,
  Send,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-secondary">
      {/* --- HEADER SECTION --- */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        {/* Background Glow to blend with secondary */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top_rgba(37,150,190,0.08),transparent_60%)]" />

        <div className="container-max px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Get in <span className="text-[#2596be]">Touch</span>
            </h1>
            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-medium">
              We're here to help. Send us a message and our team will get back
              to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT SECTION --- */}
      <section className="container-max px-6 pb-24">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: Contact Info (Elevated White Cards) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <h3 className="font-black text-slate-800 mb-6 uppercase tracking-wider text-sm">
                Contact Details
              </h3>

              <div className="space-y-6">
                {[
                  {
                    icon: <Mail size={20} />,
                    label: 'Email us',
                    val: 'support@tutorflow.com',
                  },
                  {
                    icon: <MessageSquare size={20} />,
                    label: 'Live Chat',
                    val: 'Mon-Fri, 9am-6pm',
                  },
                  {
                    icon: <MapPin size={20} />,
                    label: 'Office',
                    val: 'Education Lane, Dhaka, BD',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#2596be] border border-slate-100 group-hover:bg-[#2596be] group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                        {item.label}
                      </p>
                      <p className="text-base font-bold text-slate-700">
                        {item.val}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-8 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                  Social Ecosystem
                </p>
                <div className="flex gap-3">
                  {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 hover:text-[#2596be] hover:bg-blue-50 transition-all"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-[#2596be] rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-2">Need Quick Help?</h4>
                <p className="text-blue-100 text-sm mb-6">
                  Check our documentation for instant answers to common
                  questions.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
                >
                  Visit Help Center <ArrowRight size={16} />
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            </div>
          </motion.div>

          {/* RIGHT SIDE: Contact Form (Clean Floating Form) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-white">
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-[#2596be] focus:bg-white transition-all text-slate-700 text-sm font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-[#2596be] focus:bg-white transition-all text-slate-700 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5 mb-5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  How can we help?
                </label>
                <select className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-[#2596be] focus:bg-white transition-all text-slate-700 text-sm font-medium appearance-none">
                  <option>General Inquiry</option>
                  <option>Tutor Application</option>
                  <option>Technical Issue</option>
                </select>
              </div>

              <div className="space-y-1.5 mb-8">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-[#2596be] focus:bg-white transition-all text-slate-700 text-sm font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full max-w-sm mx-auto py-2 bg-[#2596be] hover:bg-slate-900 text-white rounded-xl font-black text-base transition-all shadow-lg shadow-[#2596be]/20 flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                Send Message
                <Send
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>

              <p className="text-center mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                Typically responds within 2 hours
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
