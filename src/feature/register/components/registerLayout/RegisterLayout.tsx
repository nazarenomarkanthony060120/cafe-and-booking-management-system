import React from "react";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export const RegisterLayout = ({ children }: LoginLayoutProps) => {
  return <div className="flex h-screen bg-[#5844bc]">{children}</div>;
};
