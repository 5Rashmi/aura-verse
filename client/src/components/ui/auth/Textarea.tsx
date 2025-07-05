import React from "react";

type TextareaProps = {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  rows: number;
  className?: string;
  icon?: React.ReactNode;
  label?: string;
};
const Textarea = ({
  name,
  value,
  onChange,
  rows,
  className,
  icon,
  label,
}: TextareaProps) => {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
          {icon}
        </div>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
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
    </div>
  );
};

export default Textarea;
