"use client";
import { useAppSelector } from "@/redux/store";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface Banner {
  id: number;
  actionUrl: string;
  imageUrl: {
    desktop: string;
    mobile: string;
  };
  imageAlt: string;
}

export default function BannerSection() {
  const { topBanners } = useAppSelector((state) => state.home);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!topBanners.length) return null;

  return (
    <div className="w-full px-4">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation={!isMobile}
        pagination={{ clickable: true, el: ".banner-pagination" }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        spaceBetween={10}
        slidesPerView={1}
        speed={3000}
      >
        {topBanners.map((banner) => (
          <SwiperSlide key={banner.id} className="px-2 md:px-8">
            <Link href={banner.actionUrl} target="_blank" rel="noreferrer">
              <div className="relative w-full h-[200px] sm:h-[220px] md:h-[250px] lg:h-[300px] rounded-lg overflow-hidden">
                <Image
                  src={banner.imageUrl.desktop}
                  alt={banner.imageAlt}
                  fill
                  priority={banner.id === 1}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                  className="object-fill rounded-lg object-center"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="banner-pagination flex justify-center mt-6 gap-2"></div>
    </div>
  );
}
