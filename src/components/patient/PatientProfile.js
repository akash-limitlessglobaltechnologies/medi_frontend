import React, { useState } from 'react';

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    age: '30',
    bloodGroup: 'B+',
    phone: '1234567890',
    email: 'john@example.com',
    address: '123 Main St, City',
    emergencyContact: '9876543210',
    allergies: 'None',
    medicalHistory: 'No major conditions'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Saving profile:', profile);
  };

  return (
    <div className="p-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Profile</h2>
          {isEditing ? (
            <div className="space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(profile).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              {isEditing ? (
                key === 'medicalHistory' ? (
                  <textarea
                    value={value}
                    onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                  />
                ) : (
                  <input
                    type={key === 'age' ? 'number' : 'text'}
                    value={value}
                    onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                )
              ) : (
                <p className="p-2 bg-gray-50 rounded-lg">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
