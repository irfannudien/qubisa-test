import React from "react";
import Image from "next/image";

export interface CategoryCardProps {
  name: string;
  description: string;
  imageUrl: string | null;
  bgColorHex: string;
}

interface CardProps {
  section: CategoryCardProps;
}

export default function CategoryCard({ section }: CardProps) {
  const { name, imageUrl, bgColorHex } = section;
  if (!imageUrl) return null;
  return (
    <div
      className={`${bgColorHex} relative flex justify-center rounded-lg shadow-sm border border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full`}
    >
      <Image
        src={imageUrl}
        alt={name}
        width={200}
        height={200}
        className="object-cover p-2"
      />
    </div>
  );
}
