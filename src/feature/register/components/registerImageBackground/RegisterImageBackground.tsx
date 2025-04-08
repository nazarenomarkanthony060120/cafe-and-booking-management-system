import React from "react";
import loginBackground from "@/assets/images/loginBackground.png";
import { CustomImage } from "@/components/common/CustomImage";

export const RegisterImageBackground = () => {
  return (
    <CustomImage
      className="relative w-3xl h-screen"
      src={loginBackground}
      alt="Login Background"
      objectFit="cover"
    />
  );
};
