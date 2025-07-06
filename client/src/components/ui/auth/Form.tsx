import React from "react";
import Button from "./Button";
import { ButtonProps } from "./types/buttonProps";

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
  buttonProps: ButtonProps;
  noValidate?: boolean;
};
const Form = ({
  onSubmit,
  children,
  className,
  buttonProps,
  noValidate,
}: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      noValidate={noValidate}
      className={`bg-card dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 
  p-8 rounded-2xl shadow-xl mt-5 max-w-md mx-auto space-y-6 
  text-card-foreground
  border border-zinc-300 dark:border-zinc-700 
  transition-all duration-300 ease-in-out hover:shadow-2xl ${className}`}
    >
      {children}
      <Button {...buttonProps} />
    </form>
  );
};

export default Form;
