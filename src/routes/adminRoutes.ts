import { Route } from '@/type';
import { NotebookPen, User } from 'lucide-react';

export const adminRoutes: Route[] = [
  {
    title: 'User Management',
    items: [
      {
        title: 'Analytic',
        url: '/admin-dashboard/analytics',
        icon: User,
      },
      {
        title: 'Category',
        url: '/admin-dashboard/category',
        icon: User,
      },
      {
        title: 'Bookings',
        url: '/admin-dashboard/bookings',
        icon: NotebookPen,
      },
      {
        title: 'Reviews',
        url: '/admin-dashboard/reviews',
        icon: User,
      },
      {
        title: 'Users',
        url: '/admin-dashboard/users',
        icon: User,
      },
    ],
  },
];
