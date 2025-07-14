import React from "react";

type InteriorProp = {
  children: React.ReactNode;
  bg: string;
};

const Interior = ({ children, bg }: InteriorProp) => {
  return (
    <div
      className={`w-full min-h-screen bg-cover bg-center`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      {children}
    </div>
  );
};

export default Interior;
