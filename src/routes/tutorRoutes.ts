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
      {
        title: 'Bookings',
        url: '/tutor-dashboard/bookings',
        icon: User,
      },
      {
        title: 'Schedule',
        url: '/tutor-dashboard/schedule',
        icon: User,
      },
      {
        title: 'Reviews',
        url: '/tutor-dashboard/reviews',
        icon: User,
      },
    ],
  },
];
