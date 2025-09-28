import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
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
  initialPrice: number;
  initialPriceString: string;
  finalPrice: number;
  finalPriceString: string;
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
  updatedDateTime?: string;
  hitRate?: number;
  numberOfContents?: number;
}

interface Section {
  title: string;
  sideBannerImageUrl: { desktop: string; mobile?: string };
  sideBannerImageAlt?: string | null;
  contents: ContentItem[];
}

export default function MicroLearningSection() {
  const { sections } = useAppSelector((state) => state.home);
  const section: Section | undefined = sections?.[4];
  const [activeTab, setActiveTab] = useState<"Terbaru" | "Terpopuler">(
    "Terbaru"
  );

  if (!section) return null;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="px-4 py-6 min-h-[64px] bg-[#F3F4F6] mt-10">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#373737] md:mb-4">
        {section.title}
      </h2>

      <div className="flex justify-between border-b border-[#E5E7EB] mb-4">
        <div className="flex">
          <button
            onClick={() => setActiveTab("Terbaru")}
            className={`px-4 py-2 cursor-pointer border-b-2 border-transparent transition-colors duration-200 font-medium text-xs md:text-md lg:text-lg ${
              activeTab === "Terbaru"
                ? "text-[#BF1E2E] border-b-[#BF1E2E]"
                : "text-[#373737] hover:border-b-[#BF1E2E]"
            }`}
          >
            Terbaru
          </button>
          <button
            onClick={() => setActiveTab("Terpopuler")}
            className={`px-4 py-2 cursor-pointer border-b-2 border-transparent transition-colors duration-200 text-md font-medium text-xs md:text-md lg:text-lg ${
              activeTab === "Terpopuler"
                ? "text-[#BF1E2E] border-b-[#BF1E2E]"
                : "text-[#373737] hover:border-b-[#BF1E2E]"
            }`}
          >
            Terpopuler
          </button>
        </div>

        <Link
          href={`/`}
          className="py-2 text-[#BF1E2E] text-xs md:text-lg font-semibold"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 ">
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
            spaceBetween={24}
            slidesPerView={3}
            loop
            className="h-full swiper-product"
          >
            {section.contents.length ? (
              section.contents.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="!w-[80%] sm:!w-[250px] md:!w-[300px]"
                >
                  <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border-gray-400 p-4 gap-2">
                    <div className="relative w-full h-40 flex-shrink-0">
                      {item.imageThumbUrl ? (
                        <Image
                          src={item.imageThumbUrl}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          No Img
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        {item.program && (
                          <span
                            className="px-2 py-0.5 rounded-md text-xs font-semibold text-white"
                            style={{
                              backgroundColor:
                                item.program.colorHex || "#BF1E2E",
                            }}
                          >
                            {item.program.shortName}
                          </span>
                        )}

                        <div className="cursor-pointer h-[74px] lg:max-h-[112px]">
                          <h3 className="text-md font-medium line-clamp-2">
                            {item.title}
                          </h3>
                        </div>

                        <div className="flex text-xs lg:text-sm lg:leading-6 text-blackBorder max-h-[28px] my-4 line-clamp-2 overflow-hidden text-ellipsis whitespace-nowrap">
                          {item.numberOfContents} Video | {item.hitRate} views
                        </div>

                        <div className="flex flex-col gap-5">
                          {item.instructors && item.instructors.length > 0 && (
                            <div className="flex items-center gap-2 mt-1">
                              {item.instructors[0].profilePic && (
                                <Image
                                  src={item.instructors[0].profilePic}
                                  alt={item.instructors[0].name}
                                  width={24}
                                  height={24}
                                  className="rounded-full"
                                />
                              )}
                              <div className="max-w-[225px]">
                                <p className="overflow-hidden text-ellipsis whitespace-nowrap max-h-4 md:max-h-5 text-xs lg:text-sm font-semibold text-blackBorder text-left">
                                  {item.instructors[0].name}
                                </p>
                                {item.instructors[0].qualification && (
                                  <p className="text-xs hidden lg:block text-blackBorder max-h-4 overflow-hidden text-left">
                                    {item.instructors[0].qualification}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="mt-3">
                            <Link
                              href={`/`}
                              className="block w-full text-left py-2 text-md md:text-lg font-semibold"
                            >
                              Lihat Sekarang
                            </Link>
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
