import { Route } from '@/type';
import { NotebookPen, User } from 'lucide-react';

export const studentRoutes: Route[] = [
  {
    title: 'Student Dashboard',
    items: [
      {
        title: 'My Account',
        url: '/dashboard/account',
        icon: User,
      },
      {
        title: 'Bookings',
        url: '/dashboard/bookings',
        icon: NotebookPen,
      },
    ],
  },
];
