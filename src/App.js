import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import RoleSelectionPage from './components/RoleSelectionPage';
import DoctorRegistration from './components/doctor/DoctorRegistration';
import PatientRegistration from './components/patient/PatientRegistration';
import DoctorHome from './components/doctor/DoctorHome';
import PatientHome from './components/patient/PatientHome';

const clientId = "987371376827-vvgf608p13j2hrprrl4jjubr5biv4up0.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/role-selection" element={<RoleSelectionPage />} />
            <Route path="/doctor/registration" element={<DoctorRegistration />} />
            <Route path="/patient/registration" element={<PatientRegistration />} />
            <Route path="/doctor/home/*" element={<DoctorHome />} />
            <Route path="/patient/home" element={<PatientHome />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;