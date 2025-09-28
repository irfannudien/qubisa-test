import React, { useState } from "react";
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
}

interface ContentTab {
  name: string;
  contentsApiUrl: string;
  contents: ContentItem[];
}

interface SuggestionContentTabs {
  contentTabs: ContentTab[];
}

const currencyFormat = (v?: number) => {
  if (v == null) return "-";
  return v.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
};

export default function ContentTabs() {
  const { suggestionContentTabs } = useAppSelector((state) => state.home);
  const suggestionData = suggestionContentTabs as SuggestionContentTabs;
  const tabs: ContentTab[] = suggestionData?.contentTabs ?? [];

  const [activeTab, setActiveTab] = useState(tabs[0]?.name ?? "");

  if (!tabs.length) return null;

  const currentTab = tabs.find((t) => t.name === activeTab);
  const currentContents = currentTab?.contents ?? [];

  return (
    <div className="px-4 py-6 min-h-[64px] mt-10">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#373737] md:mb-4">
        Saran untuk Anda
      </h2>

      <div className="flex border-b border-[#E5E7EB] mb-4 overflow-x-auto no-scrollbar">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-2 py-1 md:px-4 md:py-2 cursor-pointer border-b-2 border-transparent transition-colors duration-200 text-xs md:text-md lg:text-lg font-medium ${
                activeTab === tab.name
                  ? "text-[#BF1E2E] border-b-[#BF1E2E]"
                  : "text-[#373737] hover:border-b-[#BF1E2E]"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:w-full w-full">
        <div className="lg:w-full w-full">
          {currentContents.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentContents.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col h-full bg-white rounded-lg shadow-sm border-gray-400 p-4 gap-2"
                >
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
                      <div className="flex gap-2 text-xs">
                        {item.skillLevel && (
                          <span
                            className="px-2 py-0.5 rounded-lg text-white"
                            style={{ background: item.skillLevel.color }}
                          >
                            {item.skillLevel.name}
                          </span>
                        )}
                        {item.category && (
                          <span
                            className="px-2 py-0.5 rounded-lg text-white"
                            style={{
                              background: item.category.colorHex || "#666",
                            }}
                          >
                            {item.category.name}
                          </span>
                        )}
                      </div>

                      <div className="cursor-pointer h-[74px] lg:max-h-[112px]">
                        <h3 className="text-md font-medium line-clamp-2">
                          {item.title}
                        </h3>
                      </div>

                      {item.rating?.avg ? (
                        <Rating rating={item.rating.avg} />
                      ) : (
                        <div className="flex text-xs lg:text-sm lg:leading-6 text-blackBorder max-h-[28px] my-4 line-clamp-2 overflow-hidden text-ellipsis whitespace-nowrap">
                          {item.eventDateString || "-"}
                        </div>
                      )}

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
                            <div>
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

                        <div className="mt-3 text-right">
                          {item.price?.isFree ? (
                            <span className="text-green-600 font-bold">
                              Gratis
                            </span>
                          ) : (
                            <div className="flex flex-row justify-between">
                              <span className="font-semibold text-gray-800">
                                {item.price?.finalPriceString ??
                                  currencyFormat(item.price?.finalPrice)}
                              </span>
                              {item.price?.initialPrice !==
                                item.price?.finalPrice && (
                                <span className="text-gray-400 line-through text-sm">
                                  {item.price?.initialPriceString ??
                                    currencyFormat(item.price?.initialPrice)}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No items
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
