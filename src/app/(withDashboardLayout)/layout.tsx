export const dynamic = 'force-dynamic';
import { AppSidebar } from '@/components/DashboardCommonFile/AppSidebar';
import { UserNav } from '@/components/DashboardCommonFile/UserNav';
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
  admin: React.ReactNode;
  tutor: React.ReactNode;
  student: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const userInfo = data?.user;

  if (!userInfo) redirect('/login');

  const content =
    {
      [Roles.admin]: admin,
      [Roles.student]: student,
      [Roles.tutor]: tutor,
    }[userInfo.role as string] || tutor;

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        {/* Header Section */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-[1px] bg-border mx-2" />
            <h1 className="text-sm font-medium text-muted-foreground capitalize">
              {userInfo.role} Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <UserNav user={userInfo} />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex flex-1 flex-col gap-4 p-6 bg-gray-100 dark:bg-transparent">
          {content}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
