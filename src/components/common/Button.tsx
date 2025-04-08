import React from "react";

type ButtonType = "submit" | "reset" | "button" | undefined;

interface ButtonProps {
  className?: string;
  text: string;
  type?: ButtonType;
  onClick?: () => void;
}

export const Button = ({ className, text, type, onClick }: ButtonProps) => {
  return (
    <div>
      <button type={type} className={className} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
