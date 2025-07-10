import React from "react";
type NameProps = {
  name: string;
};
const Name = ({ name }: NameProps) => {
  return (
    <h2 className="text-2xl font-bold tracking-wide">
      {name || "Unnamed Explorer"}
    </h2>
  );
};

export default Name;
