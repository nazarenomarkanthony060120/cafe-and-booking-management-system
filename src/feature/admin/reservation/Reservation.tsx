import React from "react";
import PCard from "@/components/PCard";
const pcs = [
  { id: 1, status: "In-Use" },
  { id: 2, status: "In-Use" },
  { id: 3, status: "In-Use" },
  { id: 4, status: "Available" },
  { id: 5, status: "Available" },
  { id: 6, status: "Available" },
  { id: 7, status: "In-Use" },
  { id: 8, status: "Available" },
  { id: 9, status: "In-Use" },
  { id: 10, status: "In-Use" },
];

const Reservation = () => {
  return (
    <div className="p-6 flex">
      <div className="grid grid-cols-5 gap-6">
        {pcs.map((pc) => (
          <PCard key={pc.id} id={pc.id} status={pc.status} />
        ))}
      </div>
    </div>
  );
};

export default Reservation;
