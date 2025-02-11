import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import DoctorProfile from './DoctorProfile';
import DoctorAppointments from './DoctorAppointments';
import DoctorPatients from './DoctorPatients';

const DoctorHome = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'profile':
        return <DoctorProfile />;
      case 'appointments':
        return <DoctorAppointments />;
      case 'patients':
        return <DoctorPatients />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default DoctorHome;