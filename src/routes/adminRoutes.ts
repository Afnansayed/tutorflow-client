import { Route } from '@/type';
import { Layers2, MessageCircleCode, NotebookPen, User } from 'lucide-react';

export const adminRoutes: Route[] = [
  {
    title: 'Admin Dashboard',
    items: [
      {
        title: 'Analytic',
        url: '/admin-dashboard/analytics',
        icon: User,
      },
      {
        title: 'Category',
        url: '/admin-dashboard/category',
        icon: Layers2,
      },
      {
        title: 'Bookings',
        url: '/admin-dashboard/bookings',
        icon: NotebookPen,
      },
      {
        title: 'Reviews',
        url: '/admin-dashboard/reviews',
        icon: MessageCircleCode,
      },
      {
        title: 'Users',
        url: '/admin-dashboard/users',
        icon: User,
      },
    ],
  },
];
