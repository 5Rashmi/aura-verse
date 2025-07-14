import { ExteriorUi } from "@/constants/exteriorUi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Exterior = () => {
  return (
    <div className="w-full h-full">
      {Object.entries(ExteriorUi).map(([key, value]) => (
        <Link
          key={key}
          href={value.link}
          className="absolute flex flex-col items-center"
          style={{ top: value.position.top, left: value.position.left }}
        >
          <Image
            src={value.src}
            alt={key}
            title={key}
            width={250}
            height={250}
            className="transition-transform hover:scale-110 mb-0"
          />
        </Link>
      ))}
    </div>
  );
};

export default Exterior;
