"use client";

import React, { useState } from "react";

import { useAppSelector } from "@/redux/store";

import Image from "next/image";
import CategoryCard from "../elements/CategoryCard";
import Popup from "../elements/Popup";

export default function CategorySection() {
  const { categories, other, loading } = useAppSelector((state) => state.home);

  const firstCategories = categories.slice(0, 5);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="text-center flex gap-2 flex-col">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#262626]">
          Apa yang Ingin Anda Pelajari?
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[#262626] max-w-2xl mx-auto">
          Pilih kategori di bawah untuk mempelajari semua produk
        </p>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center">
            {firstCategories.map((section, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px]"
              >
                <CategoryCard section={section} />
              </div>
            ))}
          </div>

          {other.length > 0 && (
            <button
              onClick={() => setShowPopup(true)}
              className="flex justify-center items-center text-[#BF1E2E] font-semibold"
            >
              {other[0].iconUrl && (
                <Image
                  src={other[0].iconUrl}
                  alt={other[0].name}
                  width={40}
                  height={40}
                />
              )}
              <span className="ml-2">{other[0].name}</span>
            </button>
          )}
        </div>
      )}

      {showPopup && (
        <Popup
          title={other[0]?.name || "Kategori"}
          onClose={() => setShowPopup(false)}
          isOpen={showPopup}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((section, index) => (
              <CategoryCard key={index} section={section} />
            ))}
          </div>
        </Popup>
      )}

      <div className="relative w-full h-32 sm:h-40 md:h-56 lg:h-72">
        <Image
          src="/assets/banner-review.png"
          alt="Review"
          fill
          className="object-cover object-center rounded-lg"
        />
      </div>
    </div>
  );
}
