'use client';
import { useGetCategoriesQuery } from '@/components/Redux/RTK/categoryApi';

const Category = () => {
  const { data } = useGetCategoriesQuery(undefined);
  return <div>category</div>;
};

export default Category;
