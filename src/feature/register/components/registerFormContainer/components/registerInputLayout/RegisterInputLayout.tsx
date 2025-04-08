import React from "react";

interface RegisterInputLayoutProps {
  children: React.ReactNode;
}
const RegisterInputLayout = ({ children }: RegisterInputLayoutProps) => {
  return <div className="p-6">{children}</div>;
};

export default RegisterInputLayout;
