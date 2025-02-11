import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PatientSidebar = ({ activeTab, setActiveTab }) => {
 const navigate = useNavigate();
 const { logout } = useAuth();

 const menuItems = [
   { id: 'dashboard', label: 'Dashboard', icon: '📊' },
   { id: 'doctors', label: 'Find Doctors', icon: '👨‍⚕️' },
   { id: 'appointments', label: 'My Appointments', icon: '📅' },
   { id: 'profile', label: 'Profile', icon: '👤' }
 ];

 const handleLogout = () => {
   localStorage.removeItem('token');
   logout();
   navigate('/');
 };

 return (
   <div className="w-64 min-h-screen bg-white shadow-sm flex flex-col">
     <div className="p-6 border-b">
       <div className="flex items-center space-x-4">
         <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
           <span className="text-2xl text-white">👤</span>
         </div>
         <div>
           <h2 className="text-xl font-bold">Patient Portal</h2>
           <p className="text-sm text-gray-600">Welcome Back!</p>
         </div>
       </div>
     </div>
     <nav className="p-4 flex-grow">
       {menuItems.map(item => (
         <button
           key={item.id}
           onClick={() => setActiveTab(item.id)}
           className={`w-full flex items-center space-x-3 p-4 rounded-lg mb-2 transition-colors
             ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}
           `}
         >
           <span className="text-xl">{item.icon}</span>
           <span>{item.label}</span>
         </button>
       ))}
     </nav>
     <div className="p-4 border-t">
       <button
         onClick={handleLogout}
         className="w-full flex items-center space-x-3 p-4 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
       >
         <span className="text-xl">⎋</span>
         <span>Logout</span>
       </button>
     </div>
   </div>
 );
};

export default PatientSidebar;