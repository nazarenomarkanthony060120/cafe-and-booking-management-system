'use client';
import React, { useState } from 'react';
import Dashboard from '@/feature/user/dashboard/Dashboard';
import UserSidebar from '@/layout/user/sidebar/UserSidebar';
import Reservation from '@/feature/user/reservation/Reservation';
import SideBarHeader from '@/components/common/header';
function DashboardPage() {
    
  const [currentSection, setCurrentSection] = useState('Overview');

  const renderSection = () => {
    switch (currentSection) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Reservation':
        return <Reservation/>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen flex">
      <div className="relative">
        <UserSidebar setCurrentSection={setCurrentSection}/>
      </div>
      <div className="w-full min-h-screen text-black">
        <SideBarHeader title={currentSection} />
        {renderSection()}
      </div>
    </div>
  );
}

export default DashboardPage;
