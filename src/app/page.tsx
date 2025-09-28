"use client";

import { useEffect } from "react";

import { fetchHomeData } from "@/redux/slice/homeSlice/homeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import BannerCarousel from "@/components/sections/BannerSection";
import CategorySection from "@/components/sections/CategorySection";
import TestimoniSection from "@/components/sections/TestimoniSection";
import ProductSection from "@/components/sections/ProductSection";
import NewProductSection from "../components/sections/NewProductSection";
import BootcampSection from "@/components/sections/BootcampSection";
import CourseSection from "@/components/sections/CourseSection";
import MicroLearningSection from "@/components/sections/MicroLearningSection";
import ContentTabs from "@/components/sections/ContentTabs";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-28">
      <section>
        <BannerCarousel />
      </section>
      <section>
        <CategorySection />
      </section>
      <section>
        <TestimoniSection />
      </section>
      <section>
        <ProductSection />
      </section>
      <section>
        <NewProductSection />
      </section>
      <section>
        <BootcampSection />
      </section>
      <section>
        <CourseSection />
      </section>
      <section>
        <MicroLearningSection />
      </section>
      <section>
        <ContentTabs />
      </section>
    </div>
  );
};

export default Home;
