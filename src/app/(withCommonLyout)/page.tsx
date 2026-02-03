import Hero from "@/components/Home/Hero";
import SubjectCategories from "@/components/Home/SubjectCategories";
import SuccessStories from "@/components/Home/SuccessStories";

export default function Home() {
  return (
     <>
       <div>
          <Hero/>
          <SuccessStories/>
          <SubjectCategories/>
       </div>
     </>
  );
}
