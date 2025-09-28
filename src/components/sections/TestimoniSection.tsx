"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Popup from "../elements/Popup";

interface FeatureVideo {
  title: string;
  video: {
    url: string;
  };
  imageUrl: {
    desktop: string;
  };
}

export default function TestimoniSection() {
  const { featureVideo } = useAppSelector((state) => state.home);
  const [activeVideo, setActiveVideo] = useState<FeatureVideo | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featureVideo.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-4 md:gap-8">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#373737] md:mb-4">
              {item.title}
            </h2>

            <div
              className="relative w-full cursor-pointer group"
              onClick={() => setActiveVideo(item)}
            >
              <Image
                src={item.imageUrl.desktop}
                alt={item.title}
                width={800}
                height={450}
                className="w-full h-auto rounded-lg"
              />

              <div className="absolute inset-0 bg-black/50 rounded-lg group-hover:bg-black/60 transition-colors"></div>

              <PlayCircleIcon
                sx={{
                  fontSize: 80,
                  color: "#BF1E2E",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {activeVideo && (
        <Popup
          title={activeVideo.title}
          isOpen={activeVideo !== null}
          onClose={() => setActiveVideo(null)}
        >
          <video
            className="w-full max-w-4xl rounded-lg"
            src={activeVideo.video.url}
            controls
            autoPlay
          />
        </Popup>
      )}
    </div>
  );
}
