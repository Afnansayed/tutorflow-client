export const dynamic = 'force-dynamic';
import { AppSidebar } from '@/components/DashboardCommonFile/AppSidebar';

import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Roles } from '@/constants/roles';
import { userService } from '@/service/user.service';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  admin,
  tutor,
  student,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  tutor: React.ReactNode;
  student: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  const userInfo = data?.user;
  if (!userInfo) {
    redirect('/login');
  }

  let content: React.ReactNode;

  if (userInfo.role === Roles.admin) {
    content = admin;
  } else if (userInfo.role === Roles.student) {
    content = student;
  } else {
    content = tutor;
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{content}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
