import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DoctorRegistration = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    college: '',
    specialization: '',
    experience: '',
    city: '',
    phone: '',
    registrationNumber: '',
    fees: '',
    availability: {
      workingDays: [],
      slots: [
        { start: '09:00', end: '17:00' }
      ]
    }
  });

  const [errors, setErrors] = useState({});

  // Redirect if not authenticated
  if (!token) {
    return <Navigate to="/" />;
  }

  // Redirect if already registered
  if (user?.isRegistrationComplete) {
    return <Navigate to="/doctor/home" />;
  }

  const specializations = [
    'General Physician',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist',
    'Orthopedic',
    'Psychiatrist',
    'Gynecologist',
    'ENT Specialist',
    'Ophthalmologist'
  ];

  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const validateForm = () => {
    let tempErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      tempErrors.name = 'Name must be at least 3 characters';
    }

    // Degree validation
    if (!formData.degree.trim()) {
      tempErrors.degree = 'Degree is required';
    }

    // College validation
    if (!formData.college.trim()) {
      tempErrors.college = 'College name is required';
    }

    // Specialization validation
    if (!formData.specialization) {
      tempErrors.specialization = 'Specialization is required';
    }

    // Experience validation
    if (!formData.experience) {
      tempErrors.experience = 'Experience is required';
    } else if (parseInt(formData.experience) < 0) {
      tempErrors.experience = 'Experience cannot be negative';
    }

    // City validation
    if (!formData.city.trim()) {
      tempErrors.city = 'City is required';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = 'Enter valid 10-digit phone number';
    }

    // Registration number validation
    if (!formData.registrationNumber.trim()) {
      tempErrors.registrationNumber = 'Registration number is required';
    }

    // Fees validation
    if (!formData.fees) {
      tempErrors.fees = 'Consultation fees is required';
    } else if (parseInt(formData.fees) <= 0) {
      tempErrors.fees = 'Fees must be greater than 0';
    }

    // Working days validation
    if (formData.availability.workingDays.length === 0) {
      tempErrors.workingDays = 'Select at least one working day';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('https://medi-backend-nine.vercel.app/api/register/doctor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          navigate('/doctor/home');
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleWorkingDaysChange = (day) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        workingDays: prev.availability.workingDays.includes(day)
          ? prev.availability.workingDays.filter(d => d !== day)
          : [...prev.availability.workingDays, day]
      }
    }));
    if (errors.workingDays) {
      setErrors(prev => ({ ...prev, workingDays: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Doctor Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill in your professional details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Basic Information */}
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

            {/* Professional Details */}
            <div>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="Medical Degree"
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                  ${errors.degree ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree}</p>}
            </div>

            <div>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Medical College"
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                  ${errors.college ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.college && <p className="text-red-500 text-xs mt-1">{errors.college}</p>}
            </div>

            <div>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                  ${errors.specialization ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Specialization</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
              {errors.specialization && 
                <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Years of Experience"
                  min="0"
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                    ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.experience && 
                  <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
              </div>

              <div>
                <input
                  type="number"
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  placeholder="Consultation Fees"
                  min="0"
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                    ${errors.fees ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fees && <p className="text-red-500 text-xs mt-1">{errors.fees}</p>}
              </div>
            </div>

            {/* Contact Information */}
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
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Medical Registration Number"
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                  ${errors.registrationNumber ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.registrationNumber && 
                <p className="text-red-500 text-xs mt-1">{errors.registrationNumber}</p>}
            </div>

            {/* Working Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Working Days
              </label>
              <div className="grid grid-cols-4 gap-2">
                {weekDays.map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleWorkingDaysChange(day)}
                    className={`p-2 text-sm rounded-md border ${
                      formData.availability.workingDays.includes(day)
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              {errors.workingDays && 
                <p className="text-red-500 text-xs mt-1">{errors.workingDays}</p>}
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

export default DoctorRegistration;