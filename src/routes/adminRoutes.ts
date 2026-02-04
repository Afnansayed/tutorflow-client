import { Route } from '@/type';
import { User } from 'lucide-react';

export const adminRoutes: Route[] = [
  {
    title: 'User Management',
    items: [
      {
        title: 'Analytic',
        url: '/admin-dashboard/analytics',
        icon: User,
      },
    ],
  },
];
