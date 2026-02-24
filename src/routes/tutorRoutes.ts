import { Route } from '@/type';
import { CalendarCheck2, MessageCircleCode, NotebookPen, User } from 'lucide-react';

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
        icon: NotebookPen,
      },
      {
        title: 'Schedule',
        url: '/tutor-dashboard/schedule',
        icon: CalendarCheck2,
      },
      {
        title: 'Reviews',
        url: '/tutor-dashboard/reviews',
        icon: MessageCircleCode,
      },
    ],
  },
];
