import { Inter_Font } from "@/assets/fonts/Fonts";
import React from "react";

interface InputProps {
  text: string;
  className: string;
  required?: boolean;
  placeHolder?: string;
  type: string;
}

const Input = ({
  text,
  className,
  placeHolder,
  type,
  required = false,
}: InputProps) => {
  return (
    <div>
      <label className={`${Inter_Font.className} block text-sm font-normal`}>
        {text}
      </label>
      <input
        type={type}
        className={className}
        // value={email}
        // onChange={(e) => setEmail(e.target.value)}
        placeholder={placeHolder}
        required={required}
      />
    </div>
  );
};

export default Input;
