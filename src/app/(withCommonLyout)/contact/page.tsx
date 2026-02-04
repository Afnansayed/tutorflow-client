import { userService } from '@/service/user.service';
import { cookies } from 'next/headers';
import React from 'react';

const page = async () => {
  const cookieStore = await cookies();
  console.log({ cookieStore });
  const { data, error } = await userService.getSession();
  console.log({ data, error });
  return <div>contact page </div>;
};

export default page;
