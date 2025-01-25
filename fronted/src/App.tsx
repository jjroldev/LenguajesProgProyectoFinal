import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoutes } from './componentes/PrivateRoutes';
import { PublicRoutes } from './componentes/PublicRoutes';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {isLoggedIn ? <Route path="/*" element={<PrivateRoutes />} /> : <Route path="/*" element={<PublicRoutes />} />}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
