import React, { useState } from 'react';
import PatientSidebar from './PatientSidebar';
import PatientDashboard from './PatientDashboard';
import DoctorList from './DoctorList';
import Appointments from './Appointments';
import PatientProfile from './PatientProfile';

const PatientHome = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <PatientDashboard />;
      case 'doctors':
        return <DoctorList />;
      case 'appointments':
        return <Appointments />;
      case 'profile':
        return <PatientProfile />;
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default PatientHome;