import React from "react";
import PCard from "@/components/PCard";

const pcs = [
  { id: 1, status: "In-Use", email: "admin@email.com" },
  { id: 2, status: "In-Use", email: "admin@email.com" },
  { id: 3, status: "In-Use", email: "admin@email.com" },
  { id: 4, status: "Available", email: "admin@email.com" },
  { id: 5, status: "Available", email: "admin@email.com" },
  { id: 6, status: "Available", email: "admin@email.com" },
  { id: 7, status: "In-Use", email: "admin@email.com" },
  { id: 8, status: "Available", email: "admin@email.com" },
  { id: 9, status: "In-Use", email: "admin@email.com" },
  { id: 10, status: "In-Use", email: "admin@email.com" },
];

const Dashboard = () => {
  return (
    <div className="p-6 flex">
      <div className="flex flex-wrap gap-3">
        {pcs.map((pc) => (
          <PCard key={pc.id} id={pc.id} status={pc.status} email={pc.email} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
