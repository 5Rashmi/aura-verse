import React from "react";

const Label = ({ name }: { name: string }) => {
  return (
    <label
      htmlFor={name}
      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </label>
  );
};

export default Label;
