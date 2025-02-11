import React, { useState } from 'react';

const BookAppointment = ({ doctor, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const calendar = Array(35).fill(null).map((_, index) => {
    const day = index - firstDayOfMonth + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const handleBooking = () => {
    // Here you would integrate with your booking API
    console.log('Booking appointment:', {
      doctor,
      date: selectedDate,
      slot: selectedSlot
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Book Appointment</h2>
              <p className="text-gray-600">with {doctor.name}</p>
            </div>
            <button onClick={onClose} className="text-gray-500">✕</button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-4">Select Date</h3>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium">{day}</div>
              ))}
              {calendar.map((day, index) => (
                <button
                  key={index}
                  disabled={!day}
                  className={`
                    h-12 flex items-center justify-center rounded-lg
                    ${!day ? 'bg-gray-50' : 'hover:bg-blue-50'}
                    ${selectedDate.getDate() === day ? 'bg-blue-100' : ''}
                  `}
                  onClick={() => day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-4">Select Time Slot</h3>
            <div className="grid grid-cols-3 gap-2">
              {doctor.availability.slots.map((slot, index) => (
                <button
                  key={index}
                  className={`
                    p-2 text-center rounded-lg border
                    ${selectedSlot === slot ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'}
                  `}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot.start} - {slot.end}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Consultation Fee</p>
              <p className="text-2xl font-bold">₹{doctor.fees}</p>
            </div>
            <div className="space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                disabled={!selectedSlot}
                className={`
                  px-4 py-2 rounded-lg
                  ${selectedSlot
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                `}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
