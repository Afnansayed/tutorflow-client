
import { categoryService } from "@/service/categories.service";
import CreateTutorProfileClient from "../_components/CreateTutorProfileClient";


const CreateTutorProfile= async () => {
  const response = await categoryService.getCategories();
  const categories = response?.data?.data || [];

  return <CreateTutorProfileClient categories={categories} />;
};

export default CreateTutorProfile;