import React from "react";
import { LoginLayout } from "./components/loginLayout/LoginLayout";
import { LoginImageBackground } from "./components/loginImageBackground/LoginImageBackground";
import { LoginFormContainer } from "./components/loginFormContainer/LoginFormContainer";

export const Login = () => {
  return (
    <LoginLayout>
      <LoginImageBackground />
      <LoginFormContainer />
    </LoginLayout>
  );
};
