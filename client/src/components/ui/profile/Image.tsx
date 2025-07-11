import { ImageProps } from "@/types/Image";
import Image from "next/image";
import React from "react";

const ProfileImage = ({ src, alt, className = "w-20 h-20" }: ImageProps) => {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={80}
      height={80}
      className={`${className} rounded-full object-cover shadow-[0_0_20px_6px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_10px_rgba(168,85,247,0.6)] transition-shadow duration-300`}
      unoptimized
    />
  );
};

export default ProfileImage;
