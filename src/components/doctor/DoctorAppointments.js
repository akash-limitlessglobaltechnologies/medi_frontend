import React, { useState } from 'react';

const DoctorAppointments = () => {
  const [settings, setSettings] = useState({
    price: '500',
    duration: '30',
    slots: [
      { start: '10:00', end: '13:00' },
      { start: '17:00', end: '21:00' }
    ]
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSettingsModal, setShowSettingsModal] = useState(false);

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

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Appointment Settings</h3>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit Settings
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-medium mb-2">Consultation Fee</p>
            <p>₹{settings.price}</p>
          </div>
          <div>
            <p className="font-medium mb-2">Duration</p>
            <p>{settings.duration} minutes</p>
          </div>
          <div className="col-span-2">
            <p className="font-medium mb-2">Available Time Slots</p>
            {settings.slots.map((slot, index) => (
              <p key={index} className="mb-1">
                {slot.start} - {slot.end}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-6">Calendar</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium p-2">{day}</div>
          ))}
          {calendar.map((day, index) => (
            <button
              key={index}
              disabled={!day}
              className={`
                h-16 border rounded-lg flex flex-col items-center justify-center
                ${day ? 'hover:bg-blue-50' : 'bg-gray-50'}
                ${selectedDate.getDate() === day ? 'bg-blue-100' : ''}
              `}
              onClick={() => day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
            >
              {day && (
                <>
                  <span>{day}</span>
                  <span className="text-xs text-gray-600">3 slots</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Consultation Fee (₹)</label>
                <input
                  type="number"
                  value={settings.price}
                  onChange={(e) => setSettings({ ...settings, price: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={settings.duration}
                  onChange={(e) => setSettings({ ...settings, duration: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              {settings.slots.map((slot, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="time"
                    value={slot.start}
                    onChange={(e) => {
                      const newSlots = [...settings.slots];
                      newSlots[index].start = e.target.value;
                      setSettings({ ...settings, slots: newSlots });
                    }}
                    className="p-2 border rounded-lg"
                  />
                  <input
                    type="time"
                    value={slot.end}
                    onChange={(e) => {
                      const newSlots = [...settings.slots];
                      newSlots[index].end = e.target.value;
                      setSettings({ ...settings, slots: newSlots });
                    }}
                    className="p-2 border rounded-lg"
                  />
                </div>
              ))}
              <button
                className="text-blue-500"
                onClick={() => setSettings({
                  ...settings,
                  slots: [...settings.slots, { start: '09:00', end: '17:00' }]
                })}
              >
                + Add Time Slot
              </button>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;