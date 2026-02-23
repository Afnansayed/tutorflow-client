import { authService } from "@/service/auth.service";
import UserManagementClient from "./_components/UserManagementClient";


export default async function Page({ searchParams }: any) {
  const params = await searchParams;
  const role = params?.role || undefined;
  
  const response = await authService.getAllUser(role);
  const users = response?.data?.data || [];

  return <UserManagementClient initialUsers={users} currentRole={role} />;
}