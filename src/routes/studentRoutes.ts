import { Route } from '@/type';
import { User } from 'lucide-react';

export const studentRoutes: Route[] = [
  {
    title: 'Blog Management',
    items: [
      {
        title: 'My Account',
        url: '/dashboard/account',
        icon: User,
      },
      {
        title: 'Bookings',
        url: '/dashboard/bookings',
        icon: User,
      },
    ],
  },
];
