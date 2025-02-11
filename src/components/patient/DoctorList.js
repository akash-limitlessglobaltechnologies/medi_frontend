import React, { useState } from 'react';
import DoctorDetails from './DoctorDetails';
import BookAppointment from './BookAppointment';

const DoctorList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const doctors = [
    {
      id: 1,
      name: 'Dr. John Smith',
      specialization: 'Cardiologist',
      experience: '15 years',
      fees: 500,
      education: 'MBBS, MD Cardiology',
      rating: 4.8,
      availability: {
        slots: [
          { start: '10:00', end: '13:00' },
          { start: '17:00', end: '20:00' }
        ],
        workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday']
      }
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialization: 'Dermatologist',
      experience: '10 years',
      fees: 400,
      education: 'MBBS, MD Dermatology',
      rating: 4.6,
      availability: {
        slots: [
          { start: '09:00', end: '14:00' },
          { start: '16:00', end: '19:00' }
        ],
        workingDays: ['Monday', 'Wednesday', 'Thursday', 'Saturday']
      }
    }
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Find Doctors</h2>
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-lg w-80"
          />
        </div>

        <div className="space-y-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialization}</p>
                  <p className="text-sm text-gray-500">Experience: {doctor.experience}</p>
                  <p className="text-sm text-gray-500">Education: {doctor.education}</p>
                  <div className="mt-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      ₹{doctor.fees} per consultation
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setShowBooking(false);
                    }}
                    className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setShowBooking(true);
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDoctor && !showBooking && (
        <DoctorDetails doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}

      {showBooking && selectedDoctor && (
        <BookAppointment 
          doctor={selectedDoctor} 
          onClose={() => {
            setShowBooking(false);
            setSelectedDoctor(null);
          }} 
        />
      )}
    </div>
  );
};

export default DoctorList;
