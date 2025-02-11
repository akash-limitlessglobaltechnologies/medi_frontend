import React from 'react';

const DoctorDetails = ({ doctor, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{doctor.name}</h2>
              <p className="text-gray-600">{doctor.specialization}</p>
            </div>
            <button onClick={onClose} className="text-gray-500">✕</button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Education</h3>
              <p>{doctor.education}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Experience</h3>
              <p>{doctor.experience}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Consultation Fee</h3>
              <p>₹{doctor.fees}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Rating</h3>
              <p>{doctor.rating} ⭐</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Available Days</h3>
            <div className="flex flex-wrap gap-2">
              {doctor.availability.workingDays.map(day => (
                <span key={day} className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Time Slots</h3>
            <div className="space-y-2">
              {doctor.availability.slots.map((slot, index) => (
                <p key={index}>
                  {slot.start} - {slot.end}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
