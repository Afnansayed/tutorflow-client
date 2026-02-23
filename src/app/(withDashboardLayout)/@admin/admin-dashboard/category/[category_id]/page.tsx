
import { categoryService } from "@/service/categories.service";
import UpdateCategoryClient from "../_components/UpdateCategoryClient";


const Page = async ({ params }: { params: { category_id: string } }) => {
  const { category_id } = await params;
  const response = await categoryService.getCategoriesById(category_id);
  const category = response?.data?.data;

  return <UpdateCategoryClient category={category} category_id={category_id} />;
};

export default Page;