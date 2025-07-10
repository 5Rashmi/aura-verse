import React from "react";

type ButtonProps = {
  name: string;
  onClick: () => void;
  border?: string;
  text?: string;
  hover?: string;
  hoverText?: string;
};
const Button = ({
  name,
  onClick,
  border = "",
  text = "",
  hover = "",
  hoverText = "",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-md border ${border} ${text} ${hover} ${hoverText} transition-all duration-300 backdrop-blur-sm`}
    >
      {name}
    </button>
  );
};

export default Button;
