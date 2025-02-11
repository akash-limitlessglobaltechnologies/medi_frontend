import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleSuccess = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      console.log('Decoded:', decoded); // For debugging
      
      const data = await login(decoded);
      if (data?.user) {
        if (!data.user.role) {
          navigate('/role-selection');
        } else if (!data.user.isRegistrationComplete) {
          navigate(`/${data.user.role}/registration`);
        } else {
          navigate(`/${data.user.role}/home`);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome to Medical App
        </h2>
        <div className="flex justify-center flex-col items-center space-y-4">
          <p className="text-gray-600">Please sign in to continue</p>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;