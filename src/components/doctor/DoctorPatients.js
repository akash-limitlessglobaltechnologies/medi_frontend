import React from 'react';

const DoctorPatients = () => {
  const patients = [
    { id: 1, name: 'John Doe', age: 45, lastVisit: '2024-02-10', condition: 'Hypertension' },
    { id: 2, name: 'Jane Smith', age: 32, lastVisit: '2024-02-09', condition: 'Diabetes' },
    { id: 3, name: 'Mike Johnson', age: 28, lastVisit: '2024-02-08', condition: 'General Checkup' },
  ];

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Patients List</h2>
        <div className="space-y-4">
          {patients.map(patient => (
            <div key={patient.id} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{patient.name}</h3>
                  <p className="text-sm text-gray-600">Age: {patient.age}</p>
                  <p className="text-sm text-gray-600">Condition: {patient.condition}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Last Visit: {patient.lastVisit}</p>
                  <button className="text-blue-500 hover:underline mt-2">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorPatients;