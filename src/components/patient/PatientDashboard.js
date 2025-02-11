import React from 'react';

const PatientDashboard = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Upcoming Appointment</h3>
          <p className="text-xl">Dr. Smith</p>
          <p className="text-sm text-gray-600">Tomorrow at 10:00 AM</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Recent Reports</h3>
          <p className="text-xl">Blood Test</p>
          <p className="text-sm text-gray-600">15 Jan 2024</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Prescriptions</h3>
          <p className="text-xl">2 Active</p>
          <p className="text-sm text-gray-600">Last updated: 20 Jan 2024</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Upcoming Appointments</h3>
        <div className="space-y-4">
          {[1, 2].map(appointment => (
            <div key={appointment} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">Dr. Johnson</p>
                <p className="text-sm text-gray-600">General Checkup</p>
              </div>
              <p className="text-sm text-gray-600">20 Jan 2024 - 11:30 AM</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;