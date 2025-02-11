import React, { useState } from 'react';

const DoctorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dr. Smith',
    specialization: 'Cardiology',
    degree: 'MBBS, MD',
    college: 'Medical College',
    experience: '8 years',
    phone: '1234567890'
  });

  return (
    <div className="p-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between mb-6">
          <h3 className="text-xl font-semibold">Profile Details</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
        
        <div className="space-y-4">
          {Object.entries(profile).map(([key, value]) => (
            <div key={key} className="grid grid-cols-3 gap-4">
              <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              {isEditing ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                  className="col-span-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="col-span-2">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
