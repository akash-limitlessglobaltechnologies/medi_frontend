import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PatientRegistration = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    phone: '',
    address: '',
    city: '',
    emergencyContact: '',
    emergencyContactName: '',
    relationship: '',
    medicalHistory: {
      allergies: '',
      currentMedications: '',
      chronicDiseases: '',
      pastSurgeries: ''
    }
  });

  const [errors, setErrors] = useState({});

  // Redirect if not authenticated
  if (!token) {
    return <Navigate to="/" />;
  }

  // Redirect if already registered
  if (user?.isRegistrationComplete) {
    return <Navigate to="/patient/home" />;
  }

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const relationships = ['Parent', 'Spouse', 'Sibling', 'Child', 'Friend', 'Other'];

  const validateForm = () => {
    let tempErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      tempErrors.name = 'Name must be at least 3 characters';
    }

    // Age validation
    if (!formData.age) {
      tempErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 0 || parseInt(formData.age) > 120) {
      tempErrors.age = 'Please enter a valid age';
    }

    // Gender validation
    if (!formData.gender) {
      tempErrors.gender = 'Gender is required';
    }

    // Blood Group validation
    if (!formData.bloodGroup) {
      tempErrors.bloodGroup = 'Blood group is required';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = 'Enter valid 10-digit phone number';
    }

    // Address validation
    if (!formData.address.trim()) {
      tempErrors.address = 'Address is required';
    }

    // City validation
    if (!formData.city.trim()) {
      tempErrors.city = 'City is required';
    }

    // Emergency Contact validation
    if (!formData.emergencyContact.trim()) {
      tempErrors.emergencyContact = 'Emergency contact is required';
    } else if (!/^\d{10}$/.test(formData.emergencyContact)) {
      tempErrors.emergencyContact = 'Enter valid 10-digit phone number';
    }

    // Emergency Contact Name validation
    if (!formData.emergencyContactName.trim()) {
      tempErrors.emergencyContactName = 'Emergency contact name is required';
    }

    // Relationship validation
    if (!formData.relationship) {
      tempErrors.relationship = 'Relationship is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('https://medi-backend-nine.vercel.app/api/register/patient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          navigate('/patient/home');
        } else {
          const data = await response.json();
          setErrors({ submit: data.message || 'Registration failed' });
        }
      } catch (error) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Patient Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill in your personal details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Personal Information */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                  ${errors.name ? 'border-red-500' : 'border-gray-300'}
                  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 
                  focus:border-blue-500 focus:z-10 sm:text-sm`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  min="0"
                  max="120"
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                    ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>

              <div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                    ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>
            </div>

            <div>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                  ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              {errors.bloodGroup && 
                <p className="text-red-500 text-xs mt-1">{errors.bloodGroup}</p>}
            </div>

            {/* Contact Information */}
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                  ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                  ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                  ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Emergency Contact</h3>
              <div>
                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  placeholder="Emergency Contact Name"
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                    ${errors.emergencyContactName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.emergencyContactName && 
                  <p className="text-red-500 text-xs mt-1">{errors.emergencyContactName}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Emergency Contact Number"
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                    ${errors.emergencyContact ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.emergencyContact && 
                  <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>}
              </div>

              <div>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                    ${errors.relationship ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Relationship</option>
                  {relationships.map(rel => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                </select>
                {errors.relationship && 
                  <p className="text-red-500 text-xs mt-1">{errors.relationship}</p>}
              </div>
            </div>

            {/* Medical History */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Medical History</h3>
              <div>
                <textarea
                  name="medicalHistory.allergies"
                  value={formData.medicalHistory.allergies}
                  onChange={handleChange}
                  placeholder="Allergies (if any)"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300"
                  rows="2"
                />
              </div>

              <div>
                <textarea
                  name="medicalHistory.currentMedications"
                  value={formData.medicalHistory.currentMedications}
                  onChange={handleChange}
                  placeholder="Current Medications (if any)"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300"
                  rows="2"
                />
              </div>

              <div>
                <textarea
                  name="medicalHistory.chronicDiseases"
                  value={formData.medicalHistory.chronicDiseases}
                  onChange={handleChange}
                  placeholder="Chronic Diseases (if any)"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300"
                  rows="2"
                />
              </div>

              <div>
                <textarea
                  name="medicalHistory.pastSurgeries"
                  value={formData.medicalHistory.pastSurgeries}
                  onChange={handleChange}
                  placeholder="Past Surgeries (if any)"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300"
                  rows="2"
                />
              </div>
            </div>
          </div>

          {errors.submit && (
            <div className="text-red-500 text-sm text-center">{errors.submit}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent 
                text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Registering...' : 'Complete Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;