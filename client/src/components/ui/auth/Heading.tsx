import React from "react";

type HeadingProps = {
  heading: string;
};

const Heading = ({ heading }: HeadingProps) => {
  return (
    <div className="w-full flex justify-center">
      <h2 className="text-2xl font-semibold text-center text-primary tracking-tight relative inline-block after:block after:w-12 after:h-1 after:mt-2 after:mx-auto after:rounded-full after:bg-primary/50">
        {heading}
      </h2>
    </div>
  );
};

export default Heading;
