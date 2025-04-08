import React from "react";
import { CustomImage } from "@/components/common/CustomImage";
import TitleLogo from "@/assets/images/titleLogo.png";

const LoginTitleLogoContainer = () => {
  return (
    <div>
      <CustomImage src={TitleLogo} objectFit="contain" />
    </div>
  );
};

export default LoginTitleLogoContainer;
