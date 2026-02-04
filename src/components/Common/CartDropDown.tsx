'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  User,
  ShoppingBag,
  Star,
  Gift,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '../Authentication/logoutUser';
import { useDispatch } from 'react-redux';
import { logOut, useCurrentUserInfo } from '../Redux/Slice/authSlice';
import { useAppSelector } from '../Redux/hooks';

interface UserDropdownProps {
  userName?: string;
  isLoggedIn?: boolean;
}

export default function UserDropdown({
  userName,
  isLoggedIn = true,
}: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = {
    role: 'CUSTOMER',
  };

  // console.log(user);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    logoutUser(router); // Default redirects to home ("/")
    dispatch(logOut());
    // console.log("Signing out...");
    setIsOpen(false);
  };

  const handleGoProfile = (): string => {
    if (!user) return '/';

    switch (user?.role) {
      case 'CUSTOMER':
        return '/customer/account';
      case 'BULK_BUYER':
        return '/customer/account';
      case 'ADMIN':
        return '/dashboard';
      default:
        return '/';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Sign in button */}
      <div
        onClick={toggleDropdown}
        className="hidden lg:flex gap-1.5 cursor-pointer"
      >
        <Image src={'/icon/i.svg'} alt="user icon" width={24} height={24} />
        <button
          className="text-Black hover:text-primary transition-colors"
          title={isLoggedIn ? userName : ''} // Full name on hover
        >
          {isLoggedIn
            ? `${userName?.substring(0, 8)}${
                userName?.length && userName?.length > 8 ? '...' : ''
              }`
            : 'Sign in'}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-stroke_1 rounded-lg shadow-lg z-50">
          {isLoggedIn ? (
            <>
              {/* Header */}
              <div className="px-4 py-3 border-b border-stroke_1">
                <h3 className="font-medium text-Black">Welcome, {userName}!</h3>
              </div>
              {/* Menu Items */}
              {(user?.role === 'CUSTOMER' || user?.role === 'BULK_BUYER') && (
                <div className="py-2">
                  <Link
                    href={handleGoProfile()}
                    className="flex items-center gap-3 px-4 py-2 text-body_text hover:bg-primary_light transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>My Account</span>
                  </Link>

                  <Link
                    href="/customer/my-orders"
                    className="flex items-center gap-3 px-4 py-2 text-body_text hover:bg-primary_light transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span className="font-medium">My Orders</span>
                  </Link>

                  <Link
                    href="/contact"
                    className="flex items-center gap-3 px-4 py-2 text-body_text hover:bg-primary_light transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <HelpCircle className="w-5 h-5" />
                    <span>Contact Us</span>
                  </Link>

                  {/* <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-2 text-body_text hover:bg-primary_light transition-colors w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button> */}
                </div>
              )}
              {user?.role === 'ADMIN' && (
                <div className="py-2">
                  <Link
                    href={handleGoProfile()}
                    className="flex items-center gap-3 px-4 py-2 text-body_text hover:bg-primary_light transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                </div>
              )}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-2 text-body_text hover:bg-primary_light transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            /* Not logged in state */
            <div className="p-4">
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="block w-full bg-primary hover:bg-darker_orange text-white text-center py-2 px-4 rounded-full transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block w-full border border-body_text text-body_text hover:bg-primary_light text-center py-2 px-4 rounded-full transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
