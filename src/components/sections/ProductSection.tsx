import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useAppSelector } from "@/redux/store";
import Rating from "../elements/Rating";

interface Instructor {
  id: number;
  name: string;
  profilePic?: string;
  qualification?: string;
}

interface Program {
  name: string;
  shortName?: string;
  colorHex?: string;
  imageUrl?: string;
}

interface Price {
  isFree: boolean;
  initialPrice: number | string;
  finalPrice: number | string;
}

interface SkillLevel {
  id: number;
  name: string;
  color?: string;
}

interface Category {
  id: number;
  name: string;
  colorHex?: string;
}

interface ContentItem {
  id: number;
  title: string;
  imageThumbUrl?: string;
  rating?: { avg: number; count: number };
  eventDateString?: string;
  program?: Program;
  price?: Price;
  skillLevel?: SkillLevel;
  instructors?: Instructor[];
  category?: Category;
  contentUrl?: string;
}

interface Section {
  title: string;
  sideBannerImageUrl: { desktop: string; mobile?: string };
  sideBannerImageAlt?: string | null;
  contents: ContentItem[];
}

const currencyFormat = (value?: number) => {
  if (value == null) return "-";
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
};

export default function ProductSection() {
  const { sections } = useAppSelector((state) => state.home);
  const section: Section | undefined = sections?.[0];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!section) return null;

  return (
    <div className="px-4 py-6 min-h-[64px] bg-[#F3F4F6] mt-10">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#373737] md:mb-4">
        {section.title}
      </h2>

      <div className="flex flex-col lg:flex-row gap-4 ">
        <div className="relative w-full min-h-[300px] aspect-square lg:aspect-[2/3] bg-white rounded-lg shadow-sm border-gray-400 overflow-hidden hidden lg:block">
          {section.sideBannerImageUrl?.desktop ? (
            <Image
              src={section.sideBannerImageUrl.desktop}
              alt={section.sideBannerImageAlt || section.title}
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        <div className="lg:w-3/4 w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={!isMobile}
            spaceBetween={16}
            loop
            breakpoints={{
              0: {
                slidesPerView: 2.3,
              },

              640: {
                slidesPerView: 2.8,
              },

              1024: {
                slidesPerView: 3,
              },
            }}
            className="h-full swiper-product"
          >
            {section.contents.length ? (
              section.contents.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="flex flex-col w-full h-[350px] md:h-[400px] lg:h-full bg-white rounded-lg shadow-sm border-gray-400 p-1 md:p-2 lg:p-3 gap-2 sm:gap-3">
                    <div className="relative w-full h-25 md:h-30 lg:h-40 flex-shrink-0">
                      {item.imageThumbUrl ? (
                        <Image
                          src={item.imageThumbUrl}
                          alt={item.title}
                          fill
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          No Img
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 md:gap-2 ">
                      <div className="h-25 lg:h-18 flex flex-col gap-1">
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {item.skillLevel && (
                            <span
                              className="text-[8px] md:text-[10px] px-2 py-0.5 rounded-lg text-white"
                              style={{ background: item.skillLevel.color }}
                            >
                              {item.skillLevel.name}
                            </span>
                          )}
                          {item.category && (
                            <span
                              className="text-[8px] md:text-[10px] px-2 py-0.5 rounded-lg text-white overflow-hidden"
                              style={{
                                background: item.category.colorHex || "#666",
                              }}
                            >
                              {item.category.name}
                            </span>
                          )}
                        </div>
                        <div className="cursor-pointer max-h-[50px] md:max-h-[60px] lg:max-h-[112px]">
                          <h3 className="text-sm lg:text-lg lg:leading-6 font-medium line-clamp-3">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 md:gap-3 lg:gap-5">
                        {item.rating?.avg ? (
                          <Rating rating={item.rating.avg} />
                        ) : (
                          <div className="text-[12px] lg:text-sm lg:leading-6 max-h-[28px] my-0 md:mt-2 lg:mt-7 overflow-hidden text-ellipsis whitespace-nowrap">
                            {item.eventDateString || "-"}
                          </div>
                        )}

                        {item.instructors && item.instructors.length > 0 && (
                          <div className="flex items-center gap-2 mt-1">
                            {item.instructors[0].profilePic && (
                              <Image
                                src={item.instructors[0].profilePic}
                                alt={item.instructors[0].name}
                                width={20}
                                height={20}
                                className="rounded-full w-8 h-8"
                              />
                            )}
                            <div className="w-full">
                              <p className="line-clamp-1 lg:line-clamp-none max-h-4 md:max-h-5 text-xs md:text-sm lg:text-sm font-semibold text-left">
                                {item.instructors[0].name}
                              </p>
                              {item.instructors[0].qualification && (
                                <p className="text-[10px] sm:text-xs hidden lg:block  max-h-4 overflow-hidden text-left">
                                  {item.instructors[0].qualification}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="mt-3">
                          <div className="flex flex-col items-start lg:flex-row lg:justify-between">
                            <span className="font-semibold text-gray-800 tex-sm md:text-lg">
                              {typeof item.price?.finalPrice === "number"
                                ? currencyFormat(item.price.finalPrice)
                                : item.price?.finalPrice}
                            </span>

                            {item.price?.initialPrice !==
                              item.price?.finalPrice && (
                              <span className="text-gray-400 line-through text-xs md:text-sm lg:text-lg">
                                {typeof item.price?.initialPrice === "number"
                                  ? currencyFormat(item.price.initialPrice)
                                  : item.price?.initialPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="h-full flex items-center justify-center text-gray-500">
                  No items
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
