import React from "react";
import PCard from "@/components/PCard";

const pcs = [
  { id: 1, status: "Available", email: "bryanjames@libante"},
  { id: 2, status: "Available", email: "bryanjames@libante"},
  { id: 3, status: "Available", email: "bryanjames@libante"},
  { id: 5, status: "Available", email: "bryanjames@libante"},
  { id: 6, status: "Available", email: "bryanjames@libante"},
];

const Dashboard = () => {
  return (
    <div className="p-6 w-full">
      <div className="flex flex-wrap gap-3">
        {pcs.map((pc) => (
          <PCard key={pc.id} id={pc.id} status={pc.status} email={pc.email} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard