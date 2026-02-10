import { redirect } from 'next/navigation';

const UserDashboard = () => {
  return redirect('/dashboard/account');
};

export default UserDashboard;
