import { Route } from '@/type';
import { User } from 'lucide-react';

export const tutorRoutes: Route[] = [
  {
    title: 'Tutor  Management',
    items: [
      {
        title: 'My Account',
        url: '/tutor-dashboard/account',
        icon: User,
      },
    ],
  },
];
