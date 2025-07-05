import React from "react";
import { ButtonProps } from "./types/buttonProps";

const Button = ({ name, onClick, fullWidth = false }: ButtonProps) => {
  return (
    <div className="flex justify-center items-center">
      <button
        className={`bg-primary text-white px-6 py-3 rounded-2xl shadow-sm
                   hover:shadow-lg hover:scale-105 hover:brightness-110
                   transition-all duration-300 ease-in-out ${
                     fullWidth ? "w-full" : "w-fit"
                   }`}
        onClick={onClick}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
