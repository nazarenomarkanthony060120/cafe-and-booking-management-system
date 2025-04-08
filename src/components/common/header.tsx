import React from "react";

interface SideBarHeaderProps {
  title: string;
}

const SideBarHeader = ({ title }: SideBarHeaderProps) => {
  return (
    <div className="p-8 text-black flex items-center text-lg gap-116">
      <span className="text-[40px] font-bold">{title}</span>
    </div>
  );
};

export default SideBarHeader;
