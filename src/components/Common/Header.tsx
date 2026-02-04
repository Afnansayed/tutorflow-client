'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  ArrowRight,
  Search,
  Globe,
  Menu,
  ChevronDown,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserDropdown from './CartDropDown';

type NavSubItem = { path: string; label: string };
type NavLink =
  | { path: string; label: string }
  | { path: string; label: string; submenu: NavSubItem[] };

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links: NavLink[] = [
    { path: '/explore', label: 'Explore Tutors' },
    {
      path: '/subjects',
      label: 'Subjects',
      // submenu: [
      //   { path: "/subjects/math", label: "Math" },
      //   { path: "/subjects/science", label: "Science" },
      //   { path: "/subjects/english", label: "English" },
      // ],
    },
    { path: '/become-tutor', label: 'Become a Tutor' },
    { path: '/pricing', label: 'Pricing' },
  ];

  return (
    <div className="w-full fixed top-0 z-[999] ">
      {/* --- MAIN HEADER --- */}
      <header
        className={cn(
          'w-full transition-all duration-500 ease-in-out py-4 md:py-6',
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/50'
            : 'bg-white '
        )}
      >
        <div className="container-max  flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3 shrink-0 group"
          >
            <div className="bg-primary p-2 md:p-2.5 rounded-xl shadow-lg shadow-primary/20 transition-all duration-300">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 leading-none">
              Tutor<span className="text-primary">Flow</span>
            </span>
          </Link>

          {/* DESKTOP NAV (Hidden on Mobile) */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map(link => (
              <div key={link.path}>
                {'submenu' in link ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-[15px] font-semibold text-slate-600 hover:text-primary transition-colors rounded-full hover:bg-slate-50 outline-none">
                      {link.label} <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="w-48 p-2 rounded-2xl shadow-2xl border-slate-100"
                    >
                      {link.submenu.map((sub: NavSubItem) => (
                        <DropdownMenuItem key={sub.path} asChild>
                          <Link
                            href={sub.path}
                            className="w-full cursor-pointer rounded-xl font-medium"
                          >
                            {sub.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={link.path}
                    className={cn(
                      'px-4 py-2 text-[15px] font-semibold transition-all rounded-full hover:bg-slate-50',
                      pathname === link.path
                        ? 'text-primary bg-primary/5'
                        : 'text-slate-600 hover:text-primary'
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* SEARCH BOX (Desktop Only) */}
          <div className="hidden xl:flex flex-1 max-w-xs relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 bg-slate-100 border-none rounded-xl pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-2 md:gap-4">
            <UserDropdown />

            <Button className="bg-primary hover:bg-primary/90 text-white px-4 md:px-6 h-10 md:h-11 rounded-full font-bold shadow-lg shadow-primary/20 flex items-center gap-2 group text-sm md:text-base">
              Join <span className="hidden sm:inline">Free</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>

            {/* MOBILE MENU (Using shadcn Sheet) */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl border border-slate-100"
                  >
                    <Menu className="w-6 h-6 text-slate-700" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] border-l border-slate-100 bg-white/95 backdrop-blur-xl p-0"
                >
                  <SheetHeader className="p-6 text-left border-b border-slate-100">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-lg bg-primary p-2 text-white">
                        <GraduationCap className="h-full w-full" />
                      </div>
                      <span className="font-black text-xl tracking-tighter">
                        TutorFlow
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col p-4 gap-2">
                    {links.map(link => (
                      <div key={link.path}>
                        {'submenu' in link ? (
                          <div className="space-y-2">
                            <div className="px-4 py-3 text-sm font-bold text-slate-400 uppercase tracking-widest">
                              {link.label}
                            </div>
                            {link.submenu.map(sub => (
                              <Link
                                key={sub.path}
                                href={sub.path}
                                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 font-semibold text-slate-700"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <Link
                            href={link.path}
                            className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 font-bold text-slate-700 transition-colors"
                          >
                            {link.label}
                            <ArrowRight className="w-4 h-4 opacity-30" />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6 bg-slate-50 border-t flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-2xl font-bold border-2"
                    >
                      Log In
                    </Button>
                    <Button className="w-full h-12 rounded-2xl font-bold bg-primary">
                      Get Started
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
