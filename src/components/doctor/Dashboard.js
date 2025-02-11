import React from 'react';

const DoctorDashboard = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Today's Appointments</h3>
          <p className="text-3xl font-bold">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Total Patients</h3>
          <p className="text-3xl font-bold">145</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">This Month</h3>
          <p className="text-3xl font-bold">48</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Today's Schedule</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(app => (
            <div key={app} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">Patient {app}</p>
                <p className="text-sm text-gray-600">General Checkup</p>
              </div>
              <p className="text-sm text-gray-600">10:00 AM</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;