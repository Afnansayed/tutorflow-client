import { redirect } from "next/navigation";


const page = () => {
  return redirect("/admin-dashboard/analytics");
};

export default page;
