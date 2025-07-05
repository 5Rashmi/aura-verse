import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
type InputProps = {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
  label?: string;
};

const Input = ({
  type,
  name,
  value,
  onChange,
  required,
  className = "",
  icon,
  label,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
          {icon}
        </div>
      )}
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`peer w-full pt-6 pb-2 px-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 
          text-zinc-900 dark:text-white border border-card-foreground 
          focus:outline-none focus:ring-2 focus:ring-purple-700 
          focus:border-purple-700 transition placeholder-transparent ${className}`}
        placeholder={label || ""}
      />
      {label && (
        <label
          htmlFor={name}
          className="absolute left-10 top-2 text-zinc-500 text-sm transition-all duration-200 ease-in-out
  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
  peer-placeholder-shown:text-zinc-400
  peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-800"
        >
          {label}
        </label>
      )}
      {isPassword && (
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center text-zinc-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      )}
    </div>
  );
};

export default Input;
