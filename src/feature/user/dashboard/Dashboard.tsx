import React, { useState } from "react";
import PCard from "@/components/PCard";
import { Button } from "@/components/common/Button";
import GroupReservationModal from "@/layout/user/sidebar/component/GroupReservationModal";

const pcs = [
  { id: 1, status: "Available", email: "bryanjames@libante" },
  { id: 2, status: "Available", email: "bryanjames@libante" },
  { id: 3, status: "Available", email: "bryanjames@libante" },
  { id: 5, status: "Available", email: "bryanjames@libante" },
  { id: 6, status: "Available", email: "bryanjames@libante" },
];

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPc, setSelectedPc] = useState<{
    id: number;
    status: string;
    email: string;
  } | null>(null);

  const openModal = (pc: { id: number; status: string; email: string }) => {
    setSelectedPc(pc);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold"></h2>
        <Button
          text="Group Reservation"
          className="px-5 py-2 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xl transition-all duration-300"
          onClick={() => openModal(pcs[0])}
        />
        {selectedPc && (
          <GroupReservationModal
            isOpen={isModalOpen}
            onClose={closeModal}
            id={selectedPc.id}
            status={selectedPc.status}
            email={selectedPc.email}
            pcs={pcs.map((pc) => ({ pcName: `PC No. ${pc.id}` }))}
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {pcs.map((pc) => (
          <PCard key={pc.id} id={pc.id} status={pc.status} email={pc.email} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
