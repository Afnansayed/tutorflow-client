import { tutorService } from "@/service/tutor.service";

import TutorProfileUpdateClient from "../_components/TutorProfileUpdateClient";
import { categoryService } from "@/service/categories.service";


const TutorProfileUpdate = async () => {
  const [profileRes, categoryRes] = await Promise.all([
    tutorService.getMyProfile(),
    categoryService.getCategories(),
  ]);

  const profile = profileRes?.data?.data;
  const categories = categoryRes?.data?.data || [];

  return <TutorProfileUpdateClient profile={profile} categories={categories} />;
};

export default TutorProfileUpdate;