import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleRoleSelect = async (role) => {
    try {
      const response = await fetch('https://medi-backend-nine.vercel.app/api/auth/role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });

      if (response.ok) {
        navigate(`/${role}/registration`);
      } else {
        console.error('Role selection failed');
      }
    } catch (error) {
      console.error('Role selection error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Role</h2>
        <div className="space-y-4">
          <button
            onClick={() => handleRoleSelect('patient')}
            className="w-full p-4 text-center bg-white border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Patient
          </button>
          <button
            onClick={() => handleRoleSelect('doctor')}
            className="w-full p-4 text-center bg-white border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;