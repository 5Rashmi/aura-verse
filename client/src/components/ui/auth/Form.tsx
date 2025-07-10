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
      className={`glass-container ${className}`}
    >
      {children}
      <Button {...buttonProps} />
    </form>
  );
};

export default Form;
