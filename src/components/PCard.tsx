import React from "react";
import pcLogo from "@/assets/images/pc-icon.png";
import Image from "next/image";
interface PCCardProps {
  id: number;
  status: string;
}

const PCard: React.FC<PCCardProps> = ({ id, status }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md flex flex-col justify-center min-w-[260px] h-[115px] 
            ${
              status === "In-Use"
                ? "bg-yellow-400 text-black"
                : "border border-gray-300 text-gray-800"
            }
        `}
    >
      <div className="flex items-center justify-between">
        <span className="text-xxl font-semibold">PC {id}</span>
        <Image src={pcLogo} alt="School Logo" />
      </div>

      {/* Status Text */}
      <div className="flex items-center justify-between">
        <p className="text-sm">{status}</p>
        <a className="text-sm" href="#">View More</a>
      </div>
    </div>
  );
};

export default PCard;
