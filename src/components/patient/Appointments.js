import React from 'react';

const Appointments = () => {
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. John Smith',
      specialization: 'Cardiologist',
      date: '2024-02-15',
      time: '10:00 AM',
      status: 'Upcoming',
      fees: 500
    },
    {
      id: 2,
      doctor: 'Dr. Sarah Johnson',
      specialization: 'Dermatologist',
      date: '2024-02-10',
      time: '11:30 AM',
      status: 'Completed',
      fees: 400
    }
  ];

  return (
    <div className="p-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
        
        <div className="space-y-4">
          {appointments.map(appointment => (
            <div key={appointment.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{appointment.doctor}</h3>
                  <p className="text-gray-600">{appointment.specialization}</p>
                  <p className="text-sm text-gray-500">
                    {appointment.date} at {appointment.time}
                  </p>
                  <p className="text-sm text-gray-500">Fee: ₹{appointment.fees}</p>
                </div>
                <div className="text-right">
                  <span className={`
                    px-3 py-1 rounded-full text-sm
                    ${appointment.status === 'Upcoming'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-green-100 text-green-600'}
                  `}>
                    {appointment.status}
                  </span>
                  {appointment.status === 'Upcoming' && (
                    <button className="block mt-2 text-red-500 hover:underline">
                      Cancel Appointment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;