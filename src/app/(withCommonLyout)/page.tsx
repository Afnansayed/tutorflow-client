import Hero from '@/components/Home/Hero';
import Newsletter from '@/components/Home/NewsLetter';
import StatsCounter from '@/components/Home/StatsCounter';
import SubjectCategories from '@/components/Home/SubjectCategories';
import SuccessStories from '@/components/Home/SuccessStories';
import UserFlow from '@/components/Home/UserFlow';
import WhyChooseUs from '@/components/Home/WhyChooseUs';
import { User } from 'lucide-react';

export default function Home() {
  return (
    <>
      <div>
        <Hero />
        <SuccessStories />
        <SubjectCategories />
        <UserFlow />
        <WhyChooseUs />
        <StatsCounter />
        <Newsletter />
      </div>
    </>
  );
}
