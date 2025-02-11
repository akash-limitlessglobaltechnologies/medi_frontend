import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  if (!user?.isRegistrationComplete) {
    return <Navigate to={`/${user.role}/registration`} />;
  }

  return children;
};

export default ProtectedRoute;