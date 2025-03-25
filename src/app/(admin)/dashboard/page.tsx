'use client';
import React, { useState } from 'react';
import Dashboard from '@/feature/admin/dashboard/Dashboard';
import SideBarHeader from '@/feature/admin/header/header';
import Sidebar from '@/feature/admin/sidebar/Sidebar';
import Reservation from '@/feature/admin/reservation/Reservation';
import Bills from '@/feature/admin/bills/Bills';
function DashboardPage() {

  const [currentSection, setCurrentSection] = useState('Overview');

  const renderSection = () => {
    switch (currentSection) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Reservation':
        return <Reservation/>;
      case 'Bills':
        return <Bills/>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen flex">
      <div className="relative">
        <Sidebar setCurrentSection={setCurrentSection}/>
      </div>
      <div className="w-full min-h-screen text-black">
        <SideBarHeader title={currentSection} />
        {renderSection()}
      </div>
    </div>
  );
}

export default DashboardPage;
