'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  ArrowRight,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Browse Tutors', path: '/tutors' },
      { label: 'Online Classes', path: '/classes' },
      { label: 'Subject Categories', path: '/subjects' },
      { label: 'Success Stories', path: '/success-stories' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Become a Tutor', path: '/become-tutor' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact Us', path: '/contact' },
    ],
    support: [
      { label: 'FAQ', path: '/faq' },
      { label: 'Help Center', path: '/help' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
    ],
  };

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 overflow-hidden">
      <div className="container-max">
        {/* links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16 px-4">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="bg-primary p-2 rounded-xl text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter">
                Tutor<span className="text-primary">Flow</span>
              </span>
            </Link>
            <p className="text-white font-medium leading-relaxed mb-8 max-w-sm">
              Empowering students worldwide by connecting them with top-tier
              verified mentors for personalized 1-on-1 learning experiences.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-primary transition-all border border-white/10"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-white mb-6 uppercase text-xs tracking-[0.2em] opacity-50">
              Platform
            </h4>
            <ul className="space-y-4">
              {footerLinks.platform.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.path}
                    className="text-white/80 font-bold text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white mb-6 uppercase text-xs tracking-[0.2em] opacity-50">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.path}
                    className="text-white font-bold text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white mb-6 uppercase text-xs tracking-[0.2em] opacity-50">
              Support
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.path}
                    className="text-white/80 font-bold text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION: COPYRIGHT --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-gray-500 text-sm font-bold">
            © {currentYear} <span className="text-slate-300">TutorFlow</span>.
            All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-gray-500 text-sm font-bold">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
